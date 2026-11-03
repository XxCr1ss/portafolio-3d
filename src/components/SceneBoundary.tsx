import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  onFailure: (error: Error) => void
}

export class SceneBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error) {
    this.props.onFailure(error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
