const template = document.createElement("template");
template.innerHTML = `
<style>
.main {
  color: red;
}
</style>
<div class="main" id="main">hello world</div>
`;

class Orders extends HTMLElement {
  static get observedAttributes() {
    return ["handleCb"];
  }
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
  attributeChangedCallback(name, old, newValue) {
    console.log(name, old, newValue);
  }
  connectedCallback() {
    console.log(this.attributes);
    const fn = new Function("params", this.attributes.handleCb.value);
    fn("hello world");
    console.log(this.shadowRoot);
    window.addEventListener("handleCb", (s) => {
      console.log(s);
    });
    this.dispatchEvent(
      new CustomEvent("handleCb", {
        bubbles: true,
        detail: {
          name: "111",
        },
      })
    );
  }
}

customElements.define("order-card", Orders);
