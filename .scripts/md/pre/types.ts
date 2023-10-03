export interface PageInfo {
  hasNextPage: boolean
  endCursor?: string
}

export interface FetchViewerType {
  viewer: {
    login: string
    url: string
    bio: string
  }
}

export interface fetchPagesType<T> {
  repository: {
    [fetchName: string]: {
      pageInfo: PageInfo
      nodes: T[]
    }
  }
}

export interface fetchPagesConfigType {
  fetchName: string
  query: string
  variables: {
    owner: string
    REPOSITORY: string
    [variable: string]: string | number | undefined | any[]
  }
}

export interface DiscussionsType {
  number: number
  title: string
  createdAt: string
  publishedAt: string
  lastEditedAt?: string
  url: string
  category: {
    name: string
  }
  labels: {
    nodes:
      | {
          name: string
          color: string
        }[]
      | {
          name: string
          color: string
        }[]
  }
  body?: string
  year?: number
  month?: number
  date?: number
  layout?: string
}

export interface LabelsType {
  name: string
  color: string
}

export interface FilteredDiscussionObject {
  [propertyName: string]: DiscussionsType[]
}
