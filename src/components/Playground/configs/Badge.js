export const Badge = {
  title: "_Badge",
  useGeneratedMarkup: true,
  props: [
    { name: "label", label: "Label Text", type: "string", default: "جديد", required: true },
    {
      name: "bgColor",
      label: "Background Color",
      type: "color",
      default: "#e6f2f2",
    },
    {
      name: "labelColor",
      label: "Label/Text Color",
      type: "color",
      default: "#0d5f59",
    },
    {
      name: "borderColor",
      label: "Border Color",
      type: "color",
      default: "#0d5f59",
    },
    { name: "dot", label: "Show Status Dot", type: "boolean", default: true },
    {
      name: "radius",
      label: "Border Radius (0-5)",
      type: "number",
      default: 2,
      min: 0,
      max: 5,
    },
    {
      name: "icon",
      label: "Icon HTML",
      type: "string",
      default: '<i class="bi bi-star"></i>',
    },
    { name: "fs", label: "Font Size", type: "string", default: "14px" },
    {
      name: "fw",
      label: "Font Weight",
      type: "select",
      options: ["normal", "500", "600", "bold"],
      default: "bold",
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_Badge.cshtml", new {
    label = "${props.label}",
    bgColor = "${props.bgColor}",
    labelColor = "${props.labelColor}",
    borderColor = "${props.borderColor || props.bgColor}",
    dot = ${props.dot},
    radius = ${props.radius},
    icon = "${(props.icon || "").replace(/"/g, '\\"')}",
    style = new {
        fs = "${props.fs}",
        fw = "${props.fw}"
    }
})`,
  renderHtml: (props) => {
    const dotHtml = props.dot
      ? `<span style="width: 10px; height: 10px; background-color: ${props.labelColor}; border-radius: 50%; display: inline-block;"></span>`
      : "";
    const fontWeight = props.fw ? `font-weight: ${props.fw};` : "";
    const fontSize = props.fs
      ? `font-size: ${props.fs};`
      : "font-size: 14px;";
    const borderColor = props.borderColor || props.bgColor;
    return `<span class="badge d-flex align-items-center gap-2 px-3 py-2 rounded-${props.radius}"
    style="background-color: ${props.bgColor}; color: ${props.labelColor}; border: 1px solid ${borderColor}; ${fontSize} ${fontWeight} width: fit-content;">
  ${dotHtml}
  ${props.label}
  ${props.icon || ""}
</span>`;
  },
};
