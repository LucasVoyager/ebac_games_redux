import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { renderizaProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['Windows', 'PS4', 'PS5'],
    preco: 298.9,
    precoAntigo: 358.99,
    titulo: 'Mortal Kombat'
  },
  {
    id: 4,
    categoria: 'Sports',
    imagem: '',
    plataformas: ['Windows', 'XBOX'],
    preco: 398.9,
    precoAntigo: 558.99,
    titulo: 'F1'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  test('Texto de carregamento', () => {
    renderizaProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
  test('Deve renderizar corretamente', async () => {
    const { debug } = renderizaProvider(<Produtos />)
    waitFor(() => {
      debug()
      expect(screen.getByText('FIFA 24')).toBeInTheDocument()
    })
  })
})
