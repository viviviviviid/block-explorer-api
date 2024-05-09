1. 블록 탐색 (Block Explorer)
URL: /block/:height
Method: GET
URL Params:
Required:
height : 블록 높이 (Block Height)
Success Response:
Code: 200
Content:
json
Copy code
{
  "number": "1977423",
  "hash": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
  "parentHash": "...",
  "nonce": "...",
  "sha3Uncles": "...",
  "transactions": [...],
  "stateRoot": "...",
  "miner": "...",
  "difficulty": "...",
  "totalDifficulty": "...",
  "extraData": "...",
  "size": "...",
  "gasLimit": "...",
  "gasUsed": "...",
  "timestamp": "..."
}
Error Response:
Code: 400 BAD REQUEST
Content: { error : "Invalid height provided" }
Sample Call:
bash
Copy code
curl -X GET "http://localhost:5001/block/1977423"
Description:
이 엔드포인트는 주어진 블록 높이에 대한 상세 정보를 반환합니다.
2. 주소 트랜잭션 트래커 (Address Transaction Tracker)
URL: /block/:height/address/:address
Method: GET
URL Params:
Required:
height : 조회할 블록의 높이
address: 조회할 이더리움 주소 (Ethereum Address)
Optional Params:
unit=[ether|wei] (디폴트는 "wei")
Success Response:
Code: 200
Content:
json
Copy code
{
  "Address": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
  "Block Height": "1977423",
  "Inflow Value": "10 ether",
  "Outflow Value": "5 ether",
  "Value Summary": "5 ether",
  "Fee Summary": "0.01 ether"
}
Error Response:
Code: 404 NOT FOUND
Content: { error : "No transactions found for this address" }
Sample Call:
bash
Copy code
curl -X GET "http://localhost:5001/block/1977423/address/0xea674fdde714fd979de3edf0f56aa9716b898ec8?unit=ether"
Description:
이 엔드포인트는 주어진 블록 높이와 주소에 대한 입출금 거래 내역을 조회합니다. unit 쿼리 매개변수를 통해 반환되는 금액의 단위를 선택할 수 있습니다.