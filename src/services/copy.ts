import { CopyPayload } from "../types";

class copyComponent {
  component = "";
  copyComponent = { component: "" };

  constructor(component: string) {
    this.component = component;
  }

  async fetchCopy(): Promise<CopyPayload> {
    console.log(this);
    const copyUrl = `${window.location.origin}/data/copy/${this.copyComponent.component}.json`;

    const res = await fetch(copyUrl);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const json = await res.json();

    return json;
  }
}

export const contentWarning = new copyComponent("contentWarning");
