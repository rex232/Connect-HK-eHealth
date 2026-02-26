# Developer Portal & Resources

## 官方資源 (Official Resources)
*   **電子健康紀錄服務供應商培訓計劃 (SP Training Scheme)**
    *   [官方網頁 (中文)](https://www.ehealth.gov.hk/tc/healthcare-provider-and-professional/resources/training-and-seminars/eHR-service-provider-training-scheme.html)
    *   目的：協助 IT 供應商開發 CMS On-ramp 連接部件。

## 本地開發資源 (Local Resources)
*   **項目開發指南**: [eHealth Integration Guide](eHealth_Integration_Guide.md)
*   **Self-Service Kit**: `c:\Repo\ehealth\Self-Service Kit`
    *   申請表格: `Step 2.1 - Test Environment Setup Application Form`
    *   編碼表: `Step 2.2 - eHRSS code set\eHR Codex Table.xlsx`
    *   測試用例: `Step 2.2 & 3.1 - Self-service Data Compliance Test (DCT) test cases`

## 項目結構
*   源代碼: `src/ehealth/`
*   連接器: [EHealthConnector.js](src/ehealth/services/EHealthConnector.js)
*   消息生成: [HL7MessageGenerator.js](src/ehealth/services/HL7MessageGenerator.js)
