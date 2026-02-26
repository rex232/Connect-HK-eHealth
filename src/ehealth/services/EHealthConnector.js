// 模擬 eHealth API 連接器
const https = require('https');
const fs = require('fs');

class EHealthConnector {
    constructor(config) {
        this.endpoint = config.endpoint; // e.g., https://gateway.ehealth.gov.hk/api
        this.cert = fs.readFileSync(config.certPath);
        this.key = fs.readFileSync(config.keyPath);
        this.ca = fs.readFileSync(config.caPath);
    }

    /**
     * 上傳 HL7 消息
     * @param {string} message - HL7 或 XML 字符串
     */
    async uploadRecord(message) {
        const options = {
            hostname: this.endpoint,
            port: 443,
            path: '/upload',
            method: 'POST',
            key: this.key,
            cert: this.cert,
            ca: this.ca,
            headers: {
                'Content-Type': 'application/hl7-v2', // 或 application/xml
                'Content-Length': Buffer.byteLength(message)
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(data); // 返回 ACK 消息
                    } else {
                        reject(new Error(`Upload failed with status: ${res.statusCode}`));
                    }
                });
            });

            req.on('error', (e) => reject(e));
            req.write(message);
            req.end();
        });
    }
}

module.exports = EHealthConnector;
