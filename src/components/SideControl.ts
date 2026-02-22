import type { Map as MapLibreMap, IControl } from 'maplibre-gl';

export class SideControl implements IControl {
  private map?: MapLibreMap;
  private container?: HTMLDivElement;

  private url: string;
  private label: string;
  private openNav: () => void;

  constructor(openNav: () => void, opts?: { url?: string; label?: string }) {
    this.url = opts?.url ?? '/images/toggle.png';
    this.label = opts?.label ?? 'Open';
    this.openNav = openNav;
  }

  onAdd(map: MapLibreMap) {
    this.map = map;

    const button = document.createElement('button');
    button.type = 'button';
    button.title = this.label;
    button.setAttribute('aria-label', this.label);
    button.innerHTML = `<img src="${this.url}" width="24" aria-hidden="true">`;

    button.addEventListener('click', this.openNav);

    const container = document.createElement('div');
    container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    container.appendChild(button);

    this.container = container;
    return container;
  }

  onRemove() {
    if (this.container?.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = undefined;
  }
}