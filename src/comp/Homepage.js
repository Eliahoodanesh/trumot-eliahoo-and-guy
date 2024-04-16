import React from 'react';
import ItemDisplay from './ItemDisplay';

function HomePage() {
  return (
    <div className='container'>
        <h2>דף בית</h2>
        <div className='container-container1'>
          <ItemDisplay imageUrl={"https://cdn11.bigcommerce.com/s-fj5u5hhzyb/images/stencil/1280x1280/products/27344/15554/NEW_Boucle_Occasional_Chair_Lores_01__99432.1675195686.jpg?c=1"}/>
          <ItemDisplay imageUrl={"https://www.thespruce.com/thmb/65l9i7kdcdic4mVKvKykx1Bq6bs=/3360x0/filters:no_upscale():max_bytes(150000):strip_icc()/signs-to-replace-your-couch-4165258-hero-5266fa7b788c41f6a02f24224a5de29b.jpg"}/>
          <ItemDisplay imageUrl={"https://api.fantasticfurniture.com.au/medias/Product-Detail-Spartacus-BDILTBRNDOOOMDFOAK-LIF-CONTAINER-original-FantasticFurniture-WF?context=bWFzdGVyfGltYWdlc3wyODQyMjN8aW1hZ2UvanBlZ3xoMmMvaDcxLzEwMDI4MzUwMjEwMDc4L1Byb2R1Y3QtRGV0YWlsLVNwYXJ0YWN1c19CRElMVEJSTkRPT09NREZPQUtfTElGX0NPTlRBSU5FUl9vcmlnaW5hbF9GYW50YXN0aWNGdXJuaXR1cmUtV0Z8MjY2ZWJlMjU2NDRiMmY5Zjg5MzFlYTFiOWNmZmMzMDE3NzM1YTZiZGVmNmNmNWUyMTM3MDgwODM0NTA4NDMyMQ"}/>
      </div>
    </div>
  );
}

export default HomePage;
