<script lang="ts">
  import { MapLibre, NavigationControl, ScaleControl, GlobeControl,CustomControl,Terrain,
    RasterDEMTileSource,Hash,Sky,Light,TerrainControl, RasterTileSource,VectorTileSource,RasterLayer} from 'svelte-maplibre-gl';
  import { SideControl } from './SideControl';
  import ToggleButton from './ToggleButton.svelte';

  let isOpen = $state(false);
  const openNav = () => {
    isOpen = !isOpen;
  };
  const sideControl=new SideControl(openNav, { label: 'Menu' });

  let map: maplibregl.Map | undefined = $state.raw();
  let globe = $state(true);
  let hash = $state(true);
  let sky = $state(true);
  let hillshade = $state(true);
  let center: [number, number] = $state([137.3543, 37.062]);
  let zoom = $state(6.0);
  let pitch = $state(0);
  let bearing = $state(0);

  function handle(checked: boolean) {
    console.log('toggled:', checked);
  }

</script>

<div class="layout">
  <aside class:open={isOpen}>
    <h2>Side Nav</h2>
    <div id="mySidebar" class="sidebar">
    <button id="closeBtn" class="close-btn" onclick={openNav}>&#9746;</button>
      <div id="list">
      <details class="acc">
        <summary class="acc-summary">
          <span>表示設定</span>
          <span class="acc-chevron" aria-hidden="true"></span>
        </summary>
        <div class="acc-body" style="display:grid; gap:10px; padding-right:10px; margin-top:10px;">
          <ToggleButton label="ラベル表示" title="ラベルの表示/非表示" checked={true} onToggle={handle} />
        </div>
      </details>
      </div>
    </div>
  </aside>
  <div class="mapRoot">
    <MapLibre
      style="std.json"
      bind:map
      bind:zoom
      bind:center
      bind:pitch
      bind:bearing
      maxPitch={85}
    >
      {#if hash}
        <Hash />
      {/if}
      {#if sky}
        <Sky
          sky-color="#001560"
          horizon-color="#0090c0"
          fog-color="#ffffff"
          sky-horizon-blend={0.9}
          horizon-fog-blend={0.8}
          fog-ground-blend={0.7}
          atmosphere-blend={['interpolate', ['linear'], ['zoom'], 2, 0.8, 4, 0.3, 7, 0]}
        />
      {/if}
      <Light anchor="map" />
      <NavigationControl />
      <ScaleControl />
      <TerrainControl source="terrain" />
      <GlobeControl />
      <CustomControl position="top-left" control={sideControl} />
      <RasterDEMTileSource id="terrain" url="https://tiles.mapterhorn.com/tilejson.json">
      {#if !globe}
        <Terrain />
      {/if}
      </RasterDEMTileSource>
      <RasterTileSource
        tiles={['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg']}
        minzoom={8}
        maxzoom={18}
        attribution="国土地理院, TSIC, GEO Grid/AIST, USGS, GEBCO, NASA"
      >
        <RasterLayer />
      </RasterTileSource>
    </MapLibre>
  </div>
</div>
<style>
  .layout {
    position: fixed;
    inset: 0;
    display: grid;
    grid-template-columns: 0px 1fr;
    transition: grid-template-columns 200ms;
  }
  .layout:has(aside.open) {
    grid-template-columns: 280px 1fr;
  }

  aside {
    overflow: auto;
    background: white;
    border-right: 1px solid #ddd;
    transform: translateX(-100%);
    transition: transform 200ms;
    z-index: 1500;
    box-sizing: border-box;
    position: fixed;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    left: 0;
    box-shadow:
      2px 0 6px rgba(0,0,0,0.15),
      8px 0 24px rgba(0,0,0,0.12);
    width: 320px;
    height: 100%;
  }
  aside.open {
    transform: translateX(0);
  }

  .mapRoot {
    position: fixed;   /* ← 重要 */
    inset: 0;          /* top:0 right:0 bottom:0 left:0 */
    width: 100vw;
    height: 100vh;
  }

  /* MapLibre の実DOMにサイズを伝える */
  .mapRoot :global(.maplibregl-map) {
    width: 100%;
    height: 100%;
  }

  .close-btn{
    position: absolute;
    right: 4px;
    top: 4px;
    font-size: 16px;
    padding:4px;
  }

  .acc {
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 10px;
    padding: 8px 10px;
  }

  .acc-summary {
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 右端に押し出す */
    gap: 10px;
    list-style: none;
  }

  .acc-summary::-webkit-details-marker { display: none; } /* 既定の三角を消す */

  .acc-chevron::before {
    content: "▼";
    display: inline-block;
    transition: transform 160ms ease;
    transform: rotate(-90deg); /* 閉じてる時：右向きっぽく */
    opacity: 0.85;
  }

  .acc[open] .acc-chevron::before {
    transform: rotate(0deg); /* 開いた時：下向き */
  } 

  .acc-body {
    display: grid;
    gap: 10px;
    padding-right: 10px;
    margin-top: 10px;
  }

/* 行（左ラベル・右ボタン） */
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .row-label {
    font-size: 14px;
  }
</style>