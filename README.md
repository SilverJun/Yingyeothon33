# yingyeothon33

잉여톤 33, 아주 간단한 url redirection 서비스, 근데 이제 bun을 곁들인.

# 설치 및 실행
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.tsx
```

To build executable:

```bash
# For MacOS ARM Users
bun build --compile --target=bun-darwin-arm64 ./index.tsx --outfile yyt33

# For Windows x64 Users
bun build --compile --target=bun-windows-x64 ./index.tsx --outfile yyt33

# For Linux x64 Users
bun build --compile --target=bun-linux-x64 ./index.tsx --outfile yyt33
```

This project was created using `bun init` in bun v1.1.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# 설명

이 서버는 3가지 path를 제공합니다.
1. `/`
    * 이 경로로 접속하면 현재 설정된 url로 바로 리다이렉션 합니다.
    * 초기 설정 페이지는 https://www.yyt.life 입니다.
2. `/about`
    * 이 프로젝트의 about 페이지로 리다이렉션 합니다.
    * about 페이지는 https://github.com/SilverJun/Yingyeothon33/blob/main/README.md 로 기본 설정되어 있습니다.
3. `/api`
    * REST API를 위한 경로입니다.

이 서버는 2개의 설정 값이 존재합니다. 이 설정값은 프로젝트 루트 디렉터리의 settings.json 파일에 있습니다.

```json settings.json
{
    "initialURL": "https://www.yyt.life",
    "aboutURL": "https://github.com/SilverJun/Yingyeothon33/blob/main/README.md"
}
```

# REST API
yyt33에서는 두가지 API를 제공합니다.
1. 현재 설정된 URL 가져오기.
2. 새로운 URL 설정하기.

모두 JSON 형식의 응답을 반환합니다. 실패할 경우, code가 -1로 리턴되고 에러 관련 정보들이 추가로 담겨서 반환됩니다.

## 현재 설정된 URL 가져오기.
```bash
curl --request GET \
  --url http://localhost:3000/api/current \
  --header 'User-Agent: insomnia/9.0.0'

# {
# 	"current_url": "https://www.yyt.life/2024/04/27/the-33.html",
# 	"code": 0,
# 	"message": "success"
# }
```

## 새로운 URL 설정하기.
```bash
curl --request POST \
  --url http://localhost:3000/api/current \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.0.0' \
  --data '{
	"request_url": "https://www.yyt.life/2024/04/27/the-33.html"
}'

# {
# 	"code": 0,
# 	"message": "success"
# }
```

자세한건 Insomnia_2024-04-27.har 파일을 참고해주세요
