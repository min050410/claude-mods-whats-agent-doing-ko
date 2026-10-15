<div align="center">

# What's Agent Doing · 한국어판

**Claude가 지금 뭘 하고 있는지, 프롬프트 바로 위에서 한국어로.**

[![Claude Code mod](https://img.shields.io/badge/Claude%20Code-mod-D97757?style=flat-square)](https://github.com/topics/claude-code-mods)
[![version](https://img.shields.io/badge/version-0.4.3--ko.1-555?style=flat-square)](.claude-plugin/plugin.json)
[![license](https://img.shields.io/badge/license-MIT-3DA639?style=flat-square)](LICENSE)
[![network](https://img.shields.io/badge/network-none-3DA639?style=flat-square)](#안전한가요)
[![원작](https://img.shields.io/badge/원작-tzafrir%2Fwhats--agent--doing-24292F?style=flat-square&logo=github)](https://github.com/tzafrir/whats-agent-doing)

</div>

```
╭──────────────────────────────────────────────────────────────╮
│ ▸ ● Claude: 쿠폰 금액이 깨진 커밋 찾기 | 1분 48초            │
╰──────────────────────────────────────────────────────────────╯
❯ _
```

긴 작업을 맡기면 Claude는 몇 분씩 bisect를 돌리고, 일회용 스크립트를 짜고, 플래그가 줄줄이 붙은 명령을 실행합니다. 그동안 화면에는 스피너와 지나가는 명령뿐이라 **지금 뭘 하려는 건지, 저 명령은 왜 돌리는 건지, 멈춘 건지 느린 건지** 알기 어렵습니다.

이 mod는 프롬프트 위에 작은 상자 하나를 띄워 **지금 하고 있는 일과 걸린 시간**을 한 줄로 보여 줍니다. `▸`를 누르면 이번 턴에 한 일이 전부 펼쳐집니다.

[tzafrir/whats-agent-doing](https://github.com/tzafrir/whats-agent-doing)의 화면 문구를 자연스러운 한국어로 옮긴 버전입니다. 동작은 원작과 같습니다.

---

## 설치

Claude Code 안에서:

```
/plugin marketplace add min050410/claude-mods-whats-agent-doing-ko
/plugin install whats-agent-doing@min050410
/reload-plugins
```

터미널에서:

```bash
claude plugin marketplace add min050410/claude-mods-whats-agent-doing-ko
claude plugin install whats-agent-doing@min050410
```

설치한 뒤 새 세션을 열거나 `/reload-plugins`를 실행하면 상자가 뜹니다. 여는 명령은 따로 없습니다.

> [!IMPORTANT]
> 원작 영어판(`whats-agent-doing@tzafrir`)이 설치돼 있다면 먼저 지우세요. 둘 다 켜면 상자가 두 개 뜹니다.
> ```bash
> claude plugin uninstall whats-agent-doing@tzafrir
> ```

**필요한 것:** 터미널의 Claude Code, 또는 데스크톱 앱의 Code 탭. function hook 기반 [mod](https://github.com/anthropics/claude-code/blob/main/mods/README.md)라 function hook이 켜진 곳에서만 동작하고, 이 API는 아직 early access라 Claude Code 버전에 따라 바뀔 수 있습니다.

---

## 이렇게 보입니다

> 쿠폰을 적용하면 장바구니 합계가 틀려. 고쳐 줘.

Claude가 실행하는 명령과 상자가 보여 주는 문구:

| Claude가 실행하는 것 | 상자에 보이는 것 |
|---|---|
| `npx tsx -e "import {cartTotal} from './src/cart'; …"` | 쿠폰 10달러로 합계 재현하기 |
| `git bisect start HEAD v2.3.0 && git bisect run npx vitest run src/cart -t "fixed coupon"` | 쿠폰 금액이 깨진 커밋 찾기 \| 1분 48초 |
| `git bisect reset && npx vitest run src/cart` | bisect 정리하고 장바구니 테스트 다시 돌리기 |

bisect가 2분 가까이 돌아도 상자는 멈춘 게 아니라 bisect 중이라고 알려 줍니다. 명령 옆의 설명은 Claude가 명령마다 붙이는 설명을 그대로 보여 주는 것이라, Claude가 한국어로 대화하고 있으면 한국어로 나옵니다.

**`▸`를 누르면 지금까지 한 일이 펼쳐집니다:**

```
╭──────────────────────────────────────────────────────────────╮
│ ▾ ○ Claude: 대기 중 (지난 턴 완료, 2분 40초, 도구 5번)       │
│                                                              │
│ › 쿠폰을 적용하면 장바구니 합계가 틀려. 고쳐 줘.             │
│ ✓ cart.ts 읽는 중  0.6초                                     │
│ ✓ 쿠폰 10달러로 합계 재현하기  2.1초                         │
│ ✓ 쿠폰 금액이 깨진 커밋 찾기  1분 48초                       │
│ ∴ 생각 (52단어)  4.0초                                       │
│ ✓ cart.ts 수정 중  0.3초                                     │
│ ✓ bisect 정리하고 장바구니 테스트 다시 돌리기  31초          │
│ ✎ 답변 (38단어)  2.4초                                       │
│ ✓ 완료, 2분 40초, 도구 5번                                   │
╰──────────────────────────────────────────────────────────────╯
```

`✓` 끝남 · `✗` 실패 · `⊘` 거절됨 · `■` 중단됨 · `∴` 생각 · `✎` 답변 · `⇣` 대화 압축

서브에이전트가 돌고 있으면 에이전트마다 한 줄씩 붙습니다:

```
╭──────────────────────────────────────────────────────────────╮
│ ▸ ● Claude: 에이전트 2개 실행 중 | 1분 12초                  │
│ ◆ 계획 초안 › README.md 읽는 중  1분 12초                    │
│ ◆ 쿠폰 테스트 확인 › coupon.test.ts 읽는 중  33초            │
╰──────────────────────────────────────────────────────────────╯
```

---

## 상황별 문구

| 상황 | 상자에 보이는 것 |
|---|---|
| 요청을 막 받았을 때 | `메시지 읽는 중` |
| 생각할 때 | `생각 중 "…hook이 next를 기다려야 하니까"` |
| 응답을 기다릴 때 | `응답 대기 중` |
| 파일을 다룰 때 | `app.ts 읽는 중` · `app.ts 수정 중` · `app.ts 작성 중` |
| 큰 파일을 쓸 때 | `register.tsx 작성 중 \| 2.3 KB` |
| 검색할 때 | `"loadConfig" 검색 중` · `*.test.ts 파일 찾는 중` · `"vitest coverage" 웹 검색 중` |
| 웹에 접속할 때 | `github.com 접속 중` |
| 명령을 실행할 때 | Claude가 붙인 설명, 없으면 `npm test 실행 중` |
| 서브에이전트 | `버그 찾기 에이전트 실행 중` · `에이전트 3개 실행 중` |
| 스킬·MCP | `review 스킬 사용 중` · `github/create_issue 호출 중` |
| 승인을 기다릴 때 | `승인 대기: 테스트 실행` · `승인 대기: 테스트 실행 외 2건` |
| 질문에 답을 기다릴 때 | `선택 기다리는 중` |
| 도구 결과를 볼 때 | `결과 3개 확인 중` |
| 답을 쓸 때 | `답변 작성 중 (120단어)` |
| 대화 압축 | `대화 압축 중` |
| 쉬고 있을 때 | `대기 중 (지난 턴 완료, 42초, 도구 6번)` |
| 턴이 끝나는 방식 | `완료` · `3분 05초 만에 중단됨` · `12초 만에 오류로 멈춤` · `요청 거절` |

모든 문구와 원문, 코드 위치는 [`strings.ko.json`](strings.ko.json)에 정리돼 있습니다.

---

## 단축키

| 하는 일 | 방법 |
|---|---|
| 지금까지 한 일 펼치기·접기 | `▸` 클릭, 또는 `ctrl+x tab`으로 상자에 포커스를 두고 Enter |
| 프롬프트 위 영역 전체 접기 | `ctrl+x ctrl+a` |

설문 같은 다른 화면이 프롬프트 위를 쓰는 동안에는 상자가 잠깐 비켜 줍니다. 프롬프트 위에 그리는 다른 mod가 있으면 그 상자는 이 상자 아래에 쌓입니다.

---

## 안전한가요?

- **보여 주기만 합니다.** 모든 hook은 이벤트를 읽고 받은 그대로 넘깁니다. 설정, 지시문, 도구 호출과 결과, 모델 출력이 이 mod가 없을 때와 똑같이 Claude에게 갑니다.
- **승인 창에 대신 답하지 않습니다.** 승인 요청을 가로채지만 허용·거부·변경은 하지 않고, 상자에 `승인 대기: …`만 띄웁니다.
- **밖으로 나가는 것이 없습니다.** 네트워크, 파일 읽기·쓰기, 프로세스 실행, 모델 호출, 세션을 넘는 저장 모두 없습니다. 상태는 그 세션의 `$.state`에만 두고 세션이 끝나면 사라집니다. 직접 확인하려면:

  ```bash
  claude plugin validate .
  # calls: $.agent.list, $.clock.*, $.state.get/set, $.ui.invalidate, $.ui.resolve
  ```

- **화면에는 작업 내용이 보입니다.** 프롬프트, 파일 경로, URL, 명령 설명(없으면 명령 자체), MCP 도구 이름, 생각 한 줄이 상자에 나옵니다. 화면 공유 중이라면 참고하세요. 제어 문자와 보이지 않는 문자는 지우고 그립니다.

---

## 원작과 다른 점

| | 원작 | 한국어판 |
|---|---|---|
| 화면 문구 | 영어 | 한국어 (문구 46개) |
| 시간 표시 | `3m 05s` | `3분 05초` |
| 구분 기호 | `·` | `\|` |
| 설치 이름 | `whats-agent-doing@tzafrir` | `whats-agent-doing@min050410` |
| 동작·권한·hook | — | 원작과 같음 |

상자 앞의 `Claude:`와, Claude가 직접 쓴 텍스트(명령 설명, 생각 내용)는 번역하지 않습니다. Claude가 쓰는 언어 그대로 나옵니다.

---

## 문구를 내 입맛대로

문구는 전부 코드 안의 문자열이라 고치기 쉽습니다.

```bash
git clone https://github.com/min050410/claude-mods-whats-agent-doing-ko
cd claude-mods-whats-agent-doing-ko
claude --plugin-dir .        # 이 폴더에서 바로 불러온다, 고치면 다시 읽음
```

1. [`strings.ko.json`](strings.ko.json)에서 바꾸고 싶은 문구의 `file`과 `line`을 찾습니다.
2. `hooks/register.tsx` 또는 `hooks/activity-of.ts`의 그 줄을 고칩니다.
3. 확인합니다.
   ```bash
   claude plugin validate .
   claude plugin test .
   ```

---

## 업데이트·삭제

```bash
claude plugin marketplace update min050410             # 업데이트
claude plugin uninstall whats-agent-doing@min050410    # 삭제
```

---

## 크레딧

- 원작: [What's Agent Doing](https://github.com/tzafrir/whats-agent-doing) by [Tzafrir Rehan](https://github.com/tzafrir), 0.4.3 (`1efd306`) 기준
- 한국어판: [min050410](https://github.com/min050410)

문제나 제안은 [Issues](https://github.com/min050410/claude-mods-whats-agent-doing-ko/issues)에 남겨 주세요. 동작 자체의 버그라면 원작 저장소에도 알려 주시면 좋습니다.

## 라이선스

[MIT](LICENSE). 원작자의 저작권 표시를 그대로 유지합니다.
