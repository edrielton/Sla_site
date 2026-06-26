import { useState, useEffect } from 'react'
import { ALL_PLAYERS } from '../data'

export default function Favorites({ onPlayerClick }) {
  const [favIds, setFavIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('copa-favs') || '[]') } catch { return [] }
  })
  const [show, setShow] = useState(false)

  useEffect(() => {
    localStorage.setItem('copa-favs', JSON.stringify(favIds))
  }, [favIds])

  const toggleFav = (id) => {
    setFavIds(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const favPlayers = favIds.map(id => ({ ...ALL_PLAYERS[id], id })).filter(p => p.name)

  return (
    <>
      <button className="fav-toggle" onClick={() => setShow(!show)}>
        ❤️ {favIds.length > 0 && <span className="fav-count">{favIds.length}</span>}
      </button>
      {show && (
        <div className="fav-panel" onClick={() => setShow(false)}>
          <div className="fav-panel-inner" onClick={(e) => e.stopPropagation()}>
            <div className="fav-header">
              <h3>❤️ Meus Favoritos</h3>
              <button className="fav-close" onClick={() => setShow(false)}>✕</button>
            </div>
            {favPlayers.length === 0 ? (
              <p className="fav-empty">Nenhum favorito ainda. Clique no ❤️ nos cards de jogadores para salvar.</p>
            ) : (
              <div className="fav-list">
                {favPlayers.map(p => (
                  <div className="fav-item" key={p.id} onClick={() => { onPlayerClick(p.id); setShow(false) }}>
                    <div className="fav-avatar">
                      {p.img ? <img src={p.img} alt={p.name} onError={(e) => { e.target.parentElement.textContent = p.name.slice(0, 2).toUpperCase() }} /> : p.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="fav-info">
                      <div className="fav-name">{p.flag} {p.name}</div>
                      <div className="fav-nick">{p.nick}</div>
                    </div>
                    <button className="fav-remove" onClick={(e) => { e.stopPropagation(); toggleFav(p.id) }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <FavButtons favIds={favIds} toggleFav={toggleFav} />
    </>
  )
}

function FavButtons({ favIds, toggleFav }) {
  useEffect(() => {
    const handler = (e) => {
      const id = e.detail
      if (id) toggleFav(id)
    }
    window.addEventListener('toggle-fav', handler)
    return () => window.removeEventListener('toggle-fav', handler)
  }, [toggleFav])

  return null
}

export function FavHeart({ playerId, favIds }) {
  const isFav = favIds.includes(playerId)
  return (
    <button
      className={`fav-heart${isFav ? ' active' : ''}`}
      onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('toggle-fav', { detail: playerId })) }}
      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  )
}
