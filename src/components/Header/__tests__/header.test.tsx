import { screen } from '@testing-library/react'
import Header from '..'

import { renderizaProvider } from '../../../utils/tests'

describe('testes para o componente header', () => {
  test('deve renderizar corretamente', () => {
    renderizaProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carrinho', () => {
    renderizaProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'Sports',
              imagem: '',
              plataformas: ['Windows', 'PS4', 'PS5'],
              preco: 150.9,
              precoAntigo: 199.99,
              titulo: 'Fifa 24'
            },
            {
              id: 2,
              categoria: 'Sports',
              imagem: '',
              plataformas: ['Windows', 'XBOX'],
              preco: 198.9,
              precoAntigo: 258.99,
              titulo: 'NBA 2K24'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
