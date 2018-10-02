const processing: Leaf[] = []

export function bfs<T extends Leaf, P extends keyof T>(leaf: T, property: P, condition: any): T | null {
  if (leaf[property] === condition) {
    processing.length = 0
    return leaf
  }

  processing.push(...leaf.children)

  const nextLeaf = processing.shift()

  if (nextLeaf) {
    return bfs(nextLeaf, property as string, condition) as T
  } else {
    processing.length = 0
    return null
  }
}

export type Leaf = {
  children: Leaf[]
  [x: string]: any
}
