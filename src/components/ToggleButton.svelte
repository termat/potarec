<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string = 'ラベル';
  export let title: string = 'ラベルの表示/非表示';
  export let checked: boolean = true;        // 初期状態（バインド可）
  export let disabled: boolean = false;
  export let toggleKey: string = 'labels';   // data-toggle 用（任意）
  export let onToggle: ((checked: boolean) => void) | undefined;
  const dispatch = createEventDispatcher<{
    toggle: { checked: boolean; key: string };
  }>();

  function handleChange(e: Event) {
    const next = (e.currentTarget as HTMLInputElement).checked;
    checked = next;
    onToggle?.(next);
    dispatch('toggle', { checked: next, key: toggleKey });
  }
</script>

<div class="toggle-row" aria-disabled={disabled}>
  <div class="toggle-label">{label}</div>
  <label class="toggle" title={title}>
    <input
      data-toggle={toggleKey}
      type="checkbox"
      bind:checked
      disabled={disabled}
      onchange={handleChange}
    />
    <span class="track" aria-hidden="true"></span>
    <span class="thumb" aria-hidden="true"></span>
  </label>
</div>

<style>
.toggle-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.06);
}

.toggle-label{
  font-size: 14px;
  line-height: 1.2;
  user-select: none;
}

.toggle{
  position: relative;
  display: inline-flex;
  align-items: center;
}

.toggle input{
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.toggle .track{
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: rgba(0,0,0,0.22);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.10);
  transition: 0.18s ease;
  cursor: pointer;
}

.toggle .thumb{
  position: absolute;
  left: 3px;
  top: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.22);
  transition: 0.18s ease;
  pointer-events: none;
}

  .toggle input:checked + .track{
    background: rgba(0, 120, 255, 0.70);
  }
  .toggle input:checked ~ .thumb{
    transform: translateX(20px);
  }
  
  .toggle input:focus-visible + .track{
    outline: 3px solid rgba(0, 120, 255, 0.35);
    outline-offset: 2px;
  }
</style>