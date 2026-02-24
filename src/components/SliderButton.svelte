<script lang="ts">
  import { createEventDispatcher } from 'svelte';
    export let label: string = 'ラベル';
    export let checked: boolean = true; 
    export let value: boolean = true; 
</script>

<div class="slider-row">
	<input type="checkbox" id="20250801_6" bind:checked>
  	<label for="20250801_6">{label}</label>
  	<input type="range" id="op_20250801_6" min="0" max="100" value={value}>
</div>

<style>
.slider-row{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  row-gap: 8px;
  padding: 10px 12px;
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 12px;
  background: rgba(0,0,0,.02);
}

.slider-row input[type="checkbox"]{
  grid-column: 1;
  grid-row: 1;
  width: 18px;
  height: 18px;
  margin: 0;
}

.slider-row label{
  grid-column: 2;
  grid-row: 1;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.slider-row input[type="range"]{
  grid-column: 1 / -1;
  grid-row: 2;
  width: 100%;
  margin: 0;
  accent-color: #666;
}
</style>