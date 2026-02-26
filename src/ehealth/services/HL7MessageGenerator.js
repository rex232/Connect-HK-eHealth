// 這是一個 HL7 消息生成的示例結構
// 實際開發需要依賴 'node-hl7' 或類似庫，並參考 eHealth 的具體 Segment 定義

class HL7MessageGenerator {
    constructor(config) {
        this.sendingFacility = config.hcpId; // 機構編號
        this.version = "2.5"; // eHealth 通常使用 2.3.1 或 2.5
    }

    /**
     * 生成病人註冊消息 (ADT^A04 - Register Patient)
     * @param {Object} patientData - 內部數據庫的病人對象
     */
    generateADT_A04(patientData) {
        // 1. MSH Segment (Header)
        const msh = [
            "MSH",
            "|^~\\&",
            "CMS_SYSTEM",
            this.sendingFacility,
            "EHRSS",
            "HA",
            new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14),
            "",
            "ADT^A04",
            `MSG-${Date.now()}`,
            "P",
            this.version
        ].join("|");

        // 2. PID Segment (Patient Identification)
        // 注意：eHealth 對 HKID 格式有嚴格校驗
        // 重要：Sex 必須映射到 eHR Codex Table.xlsx 中的 EHR_SEX 代碼
        const pid = [
            "PID",
            "1",
            "",
            `${patientData.hkid}^^^HKID`, // 格式需參考 Codex 中的 Identifier Type
            "",
            `${patientData.lastName}^${patientData.firstName}`,
            "",
            patientData.dob, // YYYYMMDD
            patientData.sex // M/F -> 需轉換為 Codex 值
        ].join("|");

        // 3. 組合消息
        return `${msh}\r${pid}\r`;
    }

    /**
     * 生成臨床文檔 (CDA) 的包裝 (通常是 XML 格式)
     * @param {Object} clinicalData 
     */
    generateCDA(clinicalData) {
        // CDA 是 XML 格式，這裡僅為偽代碼
        return `
        <ClinicalDocument xmlns="urn:hl7-org:v3">
            <realmCode code="HK"/>
            <typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>
            <templateId root="2.16.840.1.113883.10.20.22.1.1"/>
            <id root="${this.sendingFacility}" extension="${clinicalData.docId}"/>
            <code code="34133-9" codeSystem="2.16.840.1.113883.6.1" displayName="Summarization of Episode Note"/>
            <title>Consultation Note</title>
            <effectiveTime value="${new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14)}"/>
            <confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>
            <recordTarget>
                <patientRole>
                    <id root="HKID" extension="${clinicalData.patient.hkid}"/>
                    <addr>${clinicalData.patient.address}</addr>
                    <telecom value="${clinicalData.patient.phone}"/>
                    <patient>
                        <name>
                            <given>${clinicalData.patient.firstName}</given>
                            <family>${clinicalData.patient.lastName}</family>
                        </name>
                        <administrativeGenderCode code="${clinicalData.patient.sex}" codeSystem="2.16.840.1.113883.5.1"/>
                        <birthTime value="${clinicalData.patient.dob}"/>
                    </patient>
                </patientRole>
            </recordTarget>
            <author>
                <time value="${new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14)}"/>
                <assignedAuthor>
                    <id root="HCP_PROF_ID" extension="${clinicalData.doctor.id}"/>
                    <assignedPerson>
                        <name>${clinicalData.doctor.name}</name>
                    </assignedPerson>
                </assignedAuthor>
            </author>
            <custodian>
                <assignedCustodian>
                    <representedCustodianOrganization>
                        <id root="HCP_ID" extension="${this.sendingFacility}"/>
                        <name>My Clinic</name>
                    </representedCustodianOrganization>
                </assignedCustodian>
            </custodian>
            <component>
                <structuredBody>
                    <!-- 診斷部分 -->
                    <component>
                        <section>
                            <code code="29548-5" codeSystem="2.16.840.1.113883.6.1" displayName="Diagnosis"/>
                            <title>Diagnosis</title>
                            <text>${clinicalData.diagnosis.text}</text>
                            <entry>
                                <observation classCode="OBS" moodCode="EVN">
                                    <code code="ICD10" codeSystem="2.16.840.1.113883.6.90"/>
                                    <value code="${clinicalData.diagnosis.code}" displayName="${clinicalData.diagnosis.name}" xsi:type="CD"/>
                                </observation>
                            </entry>
                        </section>
                    </component>
                </structuredBody>
            </component>
        </ClinicalDocument>
        `;
    }
}

module.exports = HL7MessageGenerator;
