import { clip, oneLine } from './text'

const MAX_DETAIL_CHARS = 60

/**
 * Says in a few words what a tool call is doing, for What's Agent Doing.
 *
 * @param tool the tool's name; a string, as the declared names are only the
 *   tools of the build that wrote the types (Grep and Glob are on some only)
 * @param args the call's arguments, whole or as far as they have streamed
 * @returns a short label such as `Reading register.tsx`
 */
export function activityOf(tool: string, args: Record<string, unknown>): string {
  const arg = (key: string): string => {
    const value = args[key]

    return typeof value === 'string' ? clip(oneLine(value), MAX_DETAIL_CHARS) : ''
  }

  const file = (key: string): string => baseName(arg(key))

  switch (tool) {
    case 'Bash':
    case 'PowerShell':
      return arg('description') || `${arg('command')} 실행 중`
    case 'Read':
      return `${file('file_path')} 읽는 중`
    case 'Edit':
      return `${file('file_path')} 수정 중`
    case 'Write':
      return `${file('file_path')} 작성 중`
    case 'NotebookEdit':
      return `${file('notebook_path')} 수정 중`
    case 'Grep':
      return `"${arg('pattern')}" 검색 중`
    case 'Glob':
      return `${arg('pattern')} 파일 찾는 중`
    case 'WebFetch':
      return `${hostOf(arg('url'))} 접속 중`
    case 'WebSearch':
      return `"${arg('query')}" 웹 검색 중`
    case 'Agent':
    case 'Task':
      return `${arg('description')} 에이전트 실행 중`
    case 'TodoWrite':
      return '할 일 정리 중'
    case 'AskUserQuestion':
      return '선택 기다리는 중'
    case 'Skill':
      return `${arg('skill')} 스킬 사용 중`
  }

  if (tool.startsWith('mcp__')) {
    const [, server = '', name = ''] = tool.split('__')

    return `${server}/${name} 호출 중`
  }

  return `${tool} 사용 중`
}

/**
 * The string arguments a tool call's input has streamed so far, read from
 * its partial JSON: enough to name the file or command before it is whole.
 */
export function partialArgsOf(json: string): Record<string, unknown> {
  const args: Record<string, unknown> = {}

  for (const match of json.matchAll(/"([a-z_]+)"\s*:\s*"((?:[^"\\]|\\.)*)/g)) {
    const [, key = '', raw = ''] = match

    args[key] ??= unescaped(raw)
  }

  return args
}

function unescaped(raw: string): string {
  try {
    return JSON.parse(`"${raw}"`) as string
  } catch {
    return raw
  }
}

function baseName(path: string): string {
  return path.split(/[\\/]/).pop() || path
}

function hostOf(url: string): string {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}
