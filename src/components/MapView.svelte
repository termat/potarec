<script lang="ts">
  import { MapLibre, NavigationControl, ScaleControl, GlobeControl } from 'svelte-maplibre-gl';
</script>

<div class="mapRoot">
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    zoom={5}
    center={{ lng: 137, lat: 36 }}
  >
    <NavigationControl />
    <ScaleControl />
    <GlobeControl />
  </MapLibre>
</div>

<style>
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