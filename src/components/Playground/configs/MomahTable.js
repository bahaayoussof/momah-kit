export const MomahTable = {
  title: "MomahTable",
  props: [
    {
      name: "title",
      label: "Table Title",
      type: "string",
      default: "قائمة طلبات التراخيص",
      required: true,
    },
    {
      name: "columnsRaw",
      label: "Columns (comma-separated)",
      type: "string",
      default: "رقم الطلب, تاريخ التقديم, اسم المنشأة, حالة الطلب",
      required: true,
    },
    {
      name: "searchable",
      label: "Include Search Bar",
      type: "boolean",
      default: true,
    },
    {
      name: "showBorders",
      label: "Vertical Column Borders",
      type: "boolean",
      default: false,
    },
    {
      name: "sortable",
      label: "Enable Column Sorting",
      type: "boolean",
      default: true,
    },
    {
      name: "pagination",
      label: "Enable Pagination",
      type: "boolean",
      default: true,
    },
  ],
  css: `
.momah-table-host .table-wrapper {
  border: 1px solid var(--ifm-color-emphasis-300, #e5e7eb);
  border-radius: 12px;
  overflow: hidden;
  background: var(--ifm-background-surface-color, #fff);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.momah-table-host .table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
}
.momah-table-host .table thead th {
  background-color: #f5f7f9;
  color: #6c757d;
  font-weight: 600;
  padding: 12px 16px;
  font-size: 0.9rem;
  border-bottom: 2px solid #e5e7eb;
}
.momah-table-host .momah-table-bordered tbody td:not(:last-child) {
  border-left: 1px solid #e5e7eb;
}
.momah-table-host .table tbody td {
  padding: 12px 16px;
  vertical-align: middle;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
}
.momah-table-host .table tbody tr:last-child td {
  border-bottom: none;
}
.momah-table-host .status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}
.momah-table-host .status-published {
  background: #ecfdf3;
  color: #027a48;
}
.momah-table-host .status-unpublished {
  background: #fff8eb;
  color: #b54708;
}
.momah-table-host .momah-sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.momah-table-host .momah-search-input {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 8px 14px;
  font-size: 0.85rem;
  width: 100%;
  max-width: 260px;
}
.momah-table-host .momah-table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 0.85rem;
  color: #374151;
  background: #fff;
  border-top: 1px solid #e5e7eb;
}
`,
  js: (props) => {
    const cols = (props.columnsRaw || "رقم الطلب, تاريخ التقديم, اسم المنشأة, حالة الطلب")
      .split(",")
      .map((c) => c.trim());
    const isSearchable = Boolean(props.searchable);
    const showBorders = Boolean(props.showBorders);
    const isSortable = Boolean(props.sortable);
    const hasPagination = Boolean(props.pagination);

    return `
(function() {
  var container = document.getElementById("tableContainer");
  var actionsContainer = document.getElementById("tableActions");
  if (!container) return;

  var cols = ${JSON.stringify(cols)};
  var isSearchable = ${isSearchable};
  var showBorders = ${showBorders};
  var isSortable = ${isSortable};
  var hasPagination = ${hasPagination};

  if (isSearchable && actionsContainer) {
    actionsContainer.innerHTML = '<input type="text" id="searchInput" class="form-control momah-search-input" placeholder="بحث في السجلات..." />';
  }

  var mockRows = [
    ["#10928", "2026-07-05", "شركة الأفكار الرائدة", '<span class="status-pill status-published">نشط</span>'],
    ["#10929", "2026-07-04", "مؤسسة الحلول المبتكرة", '<span class="status-pill status-unpublished">معلق</span>'],
    ["#10930", "2026-07-03", "مجموعة الرياض للتطوير", '<span class="status-pill status-published">نشط</span>']
  ];

  var html = '<div class="table-wrapper"><table class="table align-middle' + (showBorders ? ' momah-table-bordered' : '') + '"><thead><tr>';
  cols.forEach(function(col) {
    html += '<th>';
    if (isSortable) {
      html += '<button type="button" class="momah-sort-btn">' + col + ' <span style="opacity:0.4; font-size:10px;">▲▼</span></button>';
    } else {
      html += col;
    }
    html += '</th>';
  });
  html += '</tr></thead><tbody>';

  mockRows.forEach(function(row) {
    html += '<tr>';
    cols.forEach(function(col, idx) {
      var val = row[idx] !== undefined ? row[idx] : ('بيانات ' + (idx + 1));
      html += '<td>' + val + '</td>';
    });
    html += '</tr>';
  });

  html += '</tbody></table>';

  if (hasPagination) {
    html += '<div class="momah-table-footer"><span>عرض 1 إلى 3 من أصل 3 سجلات</span><span style="font-weight:600; color:#026b66;">صفحة 1 من 1</span></div>';
  }

  html += '</div>';
  container.innerHTML = html;

  if (isSearchable && actionsContainer) {
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("keyup", function() {
        var term = searchInput.value.toLowerCase();
        var trs = container.querySelectorAll("tbody tr");
        trs.forEach(function(tr) {
          tr.style.display = tr.textContent.toLowerCase().includes(term) ? "" : "none";
        });
      });
    }
  }
})();
    `;
  },
  renderRazor: (props) => `@* Include MomahTable files *@
<link rel="stylesheet" href="~/assets/css/momah-table.css" />
<link rel="stylesheet" href="~/assets/css/pagination.css" />
<script src="~/assets/js/momahTable.js"></script>

@* HTML containers for MomahTable *@
<div class="momah-table-host">
  <div style="width: 100%; text-align: right;" dir="rtl">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem;">
      <h6 style="font-weight: 500; font-size: 1.1rem; color: #016b68; margin: 0;">${props.title}</h6>
      <div id="tableActions" style="flex-grow: 1; max-width: 320px; display: flex; justify-content: flex-end;"></div>
    </div>
    <div id="tableContainer"></div>
    <div id="pagination" style="margin-top: 1rem;"></div>
  </div>
</div>

<script>
  (function() {
    const columns = [
      ${(props.columnsRaw || "").split(',').map(c => "{ header: '" + c.trim() + "', field: '...', sortable: true }").join(',\n      ')}
    ];
    const data = [/* your data array */];
    MomahTable.render('#tableContainer', columns, data, {
      showBorders: ${Boolean(props.showBorders)},
      search: ${props.searchable ? "{ containerSelector: '#tableActions', placeholder: 'بحث...' }" : "null"},
      pagination: ${props.pagination ? "{ containerSelector: '#pagination', currentPage: 1, totalPages: 5, totalCount: 50, onPageChange: (p) => {} }" : "null"}
    });
  })();
</script>`,
  renderHtml: (props) => `
<div class="momah-table-host" style="width: 100%; text-align: right;" dir="rtl">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--ifm-color-emphasis-300, #e5e7eb); padding-bottom: 1rem;">
    <h6 style="font-weight: 500; font-size: 1.1rem; color: #00a79d; margin: 0;">${props.title}</h6>
    <div id="tableActions" style="flex-grow: 1; max-width: 320px; display: flex; justify-content: flex-end;"></div>
  </div>
  <div id="tableContainer"></div>
  <div id="pagination" style="margin-top: 1rem;"></div>
</div>
`,
};
