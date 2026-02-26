# eHealth Integration Project

此項目包含將DR系統與香港 eHealth (eHRSS) 集成的開發文檔及代碼骨架。

## 核心文件
- **[eHealth Integration Guide](eHealth_Integration_Guide.md)**: 詳細的開發指南，涵蓋架構、流程及測試步驟。
- **[src/ehealth/](src/ehealth/)**: 集成模塊的代碼結構建議。
  - `services/HL7MessageGenerator.js`: HL7 v2/CDA 消息生成示例。
  - `services/EHealthConnector.js`: 安全傳輸示例 (Mutual TLS)。

## 快速開始
1. 閱讀 `eHealth_Integration_Guide.md` 了解整體流程。
2. 登錄 [eHealth Developer Portal](https://www.ehealth.gov.hk/developer/) 下載 Self-Service Kit。
3. 根據 Kit 中的 `Codex` 更新 `HL7MessageGenerator.js` 中的映射邏輯。
