appendCSS(`
.wp-text-input-wrapper {
  display: flex;
  gap: 5px;
  position: relative;
}

.wp-text-input-wrapper input {
  width: 100%;
  padding-left: 10px;
}

.wp-text-input-wrapper label {
  position: absolute;
  top: 0;
  left: 5px;
  transform: translateY(-50%);
  background-color: var(--wp-nav-item-bg);
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 9px;
}
`, { sourceName: 'interface-text-input' });

const getTextInput = ({
  idInput, idButton, label, name, value = '', placeholder, isDisabled = false,
}) => {
  return `<div class="wp-text-input-wrapper">
    <input
      ${idInput ? ` id="${idInput}" ` : ''}
      type="text"
      ${name ? ` name="${name}" ` : ''}
      value="${value}"
      placeholder="${placeholder}"
      ${isDisabled ? ' disabled ' : ''}
    />
    ${label ? `<label>${label}</label>` : ''}
    <button id="${idButton}" class="wp-nav-popup-button" title="Save">
      ${IconSave}
    </button>
  </div>`;
};

appendCSS(`
.wp-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 400;
}

.wp-checkbox-wrapper input {
  margin-left: 5px;
  margin-right: 5px;
}
`, { sourceName: 'interface-value' });

const getCheckbox = ({
  idInput, classNameInput, label, name, value, isChecked = false, type = 'checkbox',
}) => {
  return `<label class="wp-checkbox-wrapper">
    <span>
      <input
        type="${type}"
        ${idInput ? ` id="${idInput}" ` : ''}
        ${classNameInput ? ` class="${classNameInput}" ` : ''}
        name="${name}"
        ${value ? `value="${value}"` : ''}
        ${isChecked ? ' checked' : ''}
      />
    </span>
    <span>${label}</span>
  </label>`;
};

const getRadiobox = (params) => {
  return getCheckbox({ ...params, type: 'radio' });
};
