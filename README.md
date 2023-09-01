# 신한 해커톤

## 개발 순서

1. 새로운 이슈 생성
    - 템플릿에 맞게 작성
    - 담당자 본인 할당
    - 목적에 맞는 라벨 선택(기본 feature), 다중 선택 가능
2. 브랜치 생성
    - 커밋 시 반드시 해당하는 이슈번호 포함

### Commit Convention

-   type - body - footer
-   예) feat: 카카오 OAuth 로그인 구현(#이슈번호)

```
- feat: 새로운 기능 구현
- fix: 오류 수정
- docs: readme.md, json 파일 등 수정, 라이브러리 설치 (문서 관련)
- refactor: 코드 리팩토링
- style: 코드에 변화가 없는 수정 (세미콜론 등)
- chore: 빌드 부분 혹은 패키지 매니저 수정 사항
- rename: 파일 혹은 폴더명 수정, 옮기기
- remove: 파일 삭제
```

### Branch Convention

1. master branch는 최종 배포 브랜치
2. develop 브랜치에서 새로운 브랜치를 생성해서 merge 하는 방식으로 개발

-   백엔드의 경우
    -   "BE-[type]/[상세설명]"
    -   예) BE-feat/login
-   프론트의 경우
    -   "FE-[type]/[[상세설명]"
    -   예) FE-feat/login

```
- feat: 기능 구현
- fix: 오류 수정
- refactor: 코드 단순 수정 및 리팩토링
```
