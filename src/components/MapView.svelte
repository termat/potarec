<script lang="ts">
  import { MapLibre, NavigationControl, ScaleControl, GlobeControl,CustomControl } from 'svelte-maplibre-gl';
  import { SideControl } from './SideControl';
  let isOpen = false;
  const openNav = () => {
    isOpen = !isOpen;
  };
  const sideControl=new SideControl(openNav, { label: 'Menu' });
</script>

<div class="layout">
  <aside class:open={isOpen}>
    <h2>Side Nav</h2>
    <p>ここにメニュー</p>
  </aside>
  <div class="mapRoot">
    <MapLibre
      style="std.json"
      zoom={7}
      center={{ lng: 137, lat: 36 }}
    >
      <NavigationControl />
      <ScaleControl />
      <GlobeControl />
      <CustomControl position="top-left" control={sideControl} />
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
</style>