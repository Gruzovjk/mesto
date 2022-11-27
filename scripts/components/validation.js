const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  {inputErrorClass}
) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, {inputErrorClass}) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const isValid = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const setEventListeners = (
  formElement,
  {inputSelector, submitButtonSelector, ...rest}
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault);
    setEventListeners(formElement, rest);
  });
};
