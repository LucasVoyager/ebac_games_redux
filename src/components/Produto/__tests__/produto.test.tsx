import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'Sports',
  imagem: '',
  plataformas: ['Windows', 'XBOX'],
  preco: 198.9,
  precoAntigo: 258.99,
  titulo: 'NBA 2K24'
}

describe('testes para o componente produto', () => {
  test('deve renderizar corretamente', () => {
    renderizaProvider(<Produto game={jogo} />)
    expect(screen.getByText('NBA 2K24')).toBeInTheDocument()
  })

  test('deve adicionar item ao carrinho', () => {
    const { store } = renderizaProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-add-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
