import React from 'react'

import PromotionCard from './components/Promotion/Card/Card'

const App = () => {

  const promotion = {
    id: 1,
    title: "Kit Notebook De fuder o Cu da Rabiola",
    price: 1799.99,
    imageUrl: "https://cdn.gatry.com/gatry-static/promocao/imagem/c3c533abbb0998197ece188605ad9caa.png",
    url: "https://www.magazineluiza.com.br/notebook-lenovo-ideapad3i-82bs0005br-intel-core-i5-8gb-256gb-ssd-156-lcd-windows-10/p/135302600/in/note/",
    comments: [
      {
        id: 1,
        comment: "Eita Coroio"
      }
    ]
  }
  return (
    <div className="App"
      style={{
        maxWidth: 800,
        margin: "30px auto"
      }}>
      <PromotionCard
        promotion={promotion}
      />
    </div>
  );

}

export default App;
