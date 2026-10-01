/** 한국어 스도쿠 게임 화면과 퍼즐 로직을 제공합니다. */
import { useEffect, useState } from 'react'
import { Check, RotateCcw, Sparkles } from 'lucide-react'

type Difficulty = '쉬움' | '보통' | '어려움'
type Board = number[][]
type Position = { row: number; col: number }

const SIZE = 9
const EMPTY_BOARD: Board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0))

/** 숫자 배열을 무작위 순서로 섞습니다. */
function shuffle<T,>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** 스도쿠 규칙에 맞는 숫자인지 검사합니다. */
function canPlace(board: Board, row: number, col: number, value: number) {
  for (let index = 0; index < SIZE; index += 1) {
    if (board[row][index] === value || board[index][col] === value) return false
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r += 1) {
    for (let c = boxCol; c < boxCol + 3; c += 1) {
      if (board[r][c] === value) return false
    }
  }
  return true
}

/** 역추적 방식으로 완성된 스도쿠 판을 생성합니다. */
function fillBoard(board: Board): boolean {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      if (board[row][col] !== 0) continue
      for (const value of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        if (!canPlace(board, row, col, value)) continue
        board[row][col] = value
        if (fillBoard(board)) return true
        board[row][col] = 0
      }
      return false
    }
  }
  return true
}

/** 난이도에 맞춰 새 퍼즐과 정답 판을 만듭니다. */
function createPuzzle(difficulty: Difficulty) {
  const solution = EMPTY_BOARD.map((row) => [...row])
  fillBoard(solution)

  const puzzle = solution.map((row) => [...row])
  const blanks = difficulty === '쉬움' ? 35 : difficulty === '보통' ? 45 : 53
  for (const index of shuffle(Array.from({ length: 81 }, (_, i) => i)).slice(0, blanks)) {
    puzzle[Math.floor(index / 9)][index % 9] = 0
  }
  return { puzzle, solution }
}

/** 상단 브랜드와 현재 게임 상태를 안내합니다. */
function GameHeader({ filled }: { filled: number }) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <Sparkles size={21} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Daily puzzle</p>
          <h1 className="text-xl font-black tracking-tight text-slate-900">스도쿠 한 판</h1>
        </div>
      </div>
      <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
        채운 칸 <span className="ml-1 text-indigo-600">{filled}/81</span>
      </div>
    </header>
  )
}

/** 난이도와 새 게임 시작 버튼을 제공합니다. */
function GameControls({
  difficulty,
  onDifficultyChange,
  onNewGame,
}: {
  difficulty: Difficulty
  onDifficultyChange: (value: Difficulty) => void
  onNewGame: () => void
}) {
  const levels: Difficulty[] = ['쉬움', '보통', '어려움']
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex rounded-xl bg-slate-100 p-1">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onDifficultyChange(level)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              difficulty === level ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
      <button
        onClick={onNewGame}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
      >
        <RotateCcw size={16} /> 새 퍼즐
      </button>
    </div>
  )
}

/** 스도쿠 9×9 보드를 표시하고 칸 선택을 처리합니다. */
function SudokuBoard({
  board,
  initial,
  solution,
  selected,
  onSelect,
}: {
  board: Board
  initial: Board
  solution: Board
  selected: Position | null
  onSelect: (position: Position) => void
}) {
  return (
    <div className="grid aspect-square w-full grid-cols-9 overflow-hidden rounded-xl border-2 border-slate-800 bg-white">
      {board.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => {
          const isSelected = selected?.row === rowIndex && selected?.col === colIndex
          const sameValue = value !== 0 && selected && board[selected.row][selected.col] === value
          const wrong = value !== 0 && value !== solution[rowIndex][colIndex]
          const fixed = initial[rowIndex][colIndex] !== 0
          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onSelect({ row: rowIndex, col: colIndex })}
              aria-label={`${rowIndex + 1}행 ${colIndex + 1}열 ${value || '빈 칸'}`}
              className={`relative grid min-h-0 min-w-0 place-items-center border-r border-b text-[clamp(14px,3.5vw,24px)] transition-colors
                ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-slate-700' : 'border-r-slate-200'}
                ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-slate-700' : 'border-b-slate-200'}
                ${isSelected ? 'z-10 bg-indigo-600 text-white' : sameValue ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-indigo-50'}
                ${fixed && !isSelected ? 'font-black text-slate-800' : ''}
                ${!fixed && !isSelected ? 'font-semibold text-indigo-600' : ''}
                ${wrong && !isSelected ? 'bg-rose-100 text-rose-600' : ''}
                ${selected && selected.row === rowIndex ? 'bg-indigo-50' : ''}
                ${selected && selected.col === colIndex ? 'bg-indigo-50' : ''}
              `}
            >
              {value || ''}
            </button>
          )
        }),
      )}
    </div>
  )
}

/** 숫자 입력과 지우기 기능을 제공합니다. */
function NumberPad({
  onNumber,
  onErase,
  disabled,
}: {
  onNumber: (value: number) => void
  onErase: () => void
  disabled: boolean
}) {
  return (
    <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <button
          key={number}
          disabled={disabled}
          onClick={() => onNumber(number)}
          className="grid h-12 place-items-center rounded-xl border border-slate-200 bg-white text-lg font-black text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-40"
        >
          {number}
        </button>
      ))}
      <button
        onClick={onErase}
        disabled={disabled}
        className="grid h-12 place-items-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
      >
        지우기
      </button>
    </div>
  )
}

/** 게임 상태를 관리하고 스도쿠 화면을 구성합니다. */
export default function HomePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('보통')
  const [puzzleState, setPuzzleState] = useState(() => createPuzzle('보통'))
  const [board, setBoard] = useState<Board>(() => puzzleState.puzzle.map((row) => [...row]))
  const [selected, setSelected] = useState<Position | null>(null)
  const [message, setMessage] = useState('빈 칸을 선택하고 숫자를 입력해 보세요.')
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sudoku-board')
    if (!saved) return
    try {
      const data = JSON.parse(saved)
      if (Array.isArray(data.board) && Array.isArray(data.puzzle) && Array.isArray(data.solution)) {
        setDifficulty(data.difficulty)
        setPuzzleState({ puzzle: data.puzzle, solution: data.solution })
        setBoard(data.board)
      }
    } catch {
      localStorage.removeItem('sudoku-board')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sudoku-board', JSON.stringify({ difficulty, ...puzzleState, board }))
  }, [difficulty, puzzleState, board])

  /** 선택한 칸에 숫자를 넣고 정답 여부를 확인합니다. */
  function enterNumber(value: number) {
    if (!selected || complete) {
      setMessage('먼저 숫자를 입력할 칸을 선택해 주세요.')
      return
    }
    if (puzzleState.puzzle[selected.row][selected.col] !== 0) {
      setMessage('처음부터 주어진 숫자는 바꿀 수 없어요.')
      return
    }
    const next = board.map((row) => [...row])
    next[selected.row][selected.col] = value
    setBoard(next)
    setMessage(value === puzzleState.solution[selected.row][selected.col] ? '좋아요! 정답이에요.' : '다시 확인해 보세요.')
    if (next.every((row, r) => row.every((cell, c) => cell === puzzleState.solution[r][c]))) {
      setComplete(true)
      setMessage('완성했어요! 멋진 한 판이었습니다 🎉')
    }
  }

  /** 선택된 칸의 숫자를 지웁니다. */
  function eraseCell() {
    if (!selected || puzzleState.puzzle[selected.row][selected.col] !== 0) return
    const next = board.map((row) => [...row])
    next[selected.row][selected.col] = 0
    setBoard(next)
    setComplete(false)
    setMessage('선택한 칸을 비웠어요.')
  }

  /** 선택한 난이도로 새 퍼즐을 시작합니다. */
  function startNewGame(level = difficulty) {
    const next = createPuzzle(level)
    setDifficulty(level)
    setPuzzleState(next)
    setBoard(next.puzzle.map((row) => [...row]))
    setSelected(null)
    setComplete(false)
    setMessage('새 퍼즐이 준비됐어요. 즐겁게 풀어 보세요!')
  }

  const filled = board.flat().filter(Boolean).length

  return (
    <main className="min-h-screen bg-[#f5f6fb] px-4 py-8 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <GameHeader filled={filled} />
        <section className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_20px_60px_-35px_rgba(39,49,93,0.35)] sm:p-7">
          <GameControls
            difficulty={difficulty}
            onDifficultyChange={(level) => startNewGame(level)}
            onNewGame={() => startNewGame()}
          />
          <SudokuBoard
            board={board}
            initial={puzzleState.puzzle}
            solution={puzzleState.solution}
            selected={selected}
            onSelect={setSelected}
          />
          <NumberPad onNumber={enterNumber} onErase={eraseCell} disabled={complete} />
          <div className={`mt-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
            complete ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-600'
          }`}>
            {complete ? <Check size={17} /> : <Sparkles size={16} />}
            <p>{message}</p>
          </div>
        </section>
        <p className="mt-5 text-center text-xs text-slate-400">진행 상황은 이 브라우저에 자동 저장됩니다.</p>
      </div>
    </main>
  )
}
