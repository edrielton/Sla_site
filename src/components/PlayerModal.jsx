export default function PlayerModal({ player, onClose }) {
  if (!player) return null

  return (
    <div className="modal-bg open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="mo-head">
          <div className="mo-img">
            {player.img
              ? <img src={player.img} alt={player.name} onError={(e) => { e.target.parentElement.textContent = player.name.slice(0, 2).toUpperCase() }} />
              : player.name.slice(0, 2).toUpperCase()
            }
          </div>
          <div className="mo-titles">
            <div className="mo-flag">{player.flag}</div>
            <div className="mo-name">{player.name}</div>
            <div className="mo-nick">"{player.nick}"</div>
          </div>
          <button className="mo-close" onClick={onClose}>✕</button>
        </div>
        <div className="mo-body">
          <div className="mo-bio">{player.bio}</div>
          <div className="mo-facts">
            {(player.facts || []).map((f, i) => (
              <div className="mo-fact" key={i}>
                <div className="mo-fact-l">{f[0]}</div>
                <div className="mo-fact-v">{f[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
