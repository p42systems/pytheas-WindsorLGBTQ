import { CopyPayload } from "../types";

class copyComponent {
  component = "";
  copyComponent = { component: "" };

  constructor(component: string) {
    this.component = component;
  }

  async fetchCopy(): Promise<CopyPayload> {
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

export const tourInstructions = new copyComponent("tourInstructions");

export const sponsors = new copyComponent("sponsors");

export const about = new copyComponent("about");

export const statement = new copyComponent("statement");

export const references = new copyComponent("references");
