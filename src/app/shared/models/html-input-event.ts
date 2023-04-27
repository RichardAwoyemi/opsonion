export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
  base64: string;
}
