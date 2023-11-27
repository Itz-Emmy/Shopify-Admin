const notificationBell = document.querySelector(".notification-bell");
const alertBox = document.querySelector(".alert");
const menuName = document.querySelector(".profile-menu");
const profileMenu = document.querySelector(".profile-menu-dropdown");

menuName.addEventListener("click", (event) => {
  const isExpanded = menuName.attributes["aria-expanded"].value === "true";
  const menuHead = document.querySelector(".profile-menu-head");
  if (isExpanded) {
    menuName.ariaExpanded = "false";
  } else {
    menuName.ariaExpanded = "true";
    menuHead.focus();
  }

  profileMenu.classList.toggle("show-menu");
  alertBox.classList.remove("show-alert");
});

menuName.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    const isExpanded = menuName.attributes["aria-expanded"].value === "true";
    const menuHead = document.querySelector(".profile-menu-head");
    if (isExpanded) {
      menuName.ariaExpanded = "false";
    } else {
      menuName.ariaExpanded = "true";
      menuHead.focus();
    }
    profileMenu.classList.toggle("show-menu");
    alertBox.classList.remove("show-alert");
  }
});

menuName.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    profileMenu.classList.toggle("show-menu");
    alertBox.classList.remove("show-alert");
  }
});

const handleMenuKeyPress = (event, index) => {
  const lastMenuItem = index === menuItems.length - 1;
  const firstMenuitem = index === 0;
  const nextItem = menuItems[index + 1];
  const prevItem = menuItems[index - 1];

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    if (lastMenuItem) {
      menuItems[0].focus();
      return;
    }
    nextItem.focus();
  }
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    if (firstMenuitem) {
      menuItems[menuItems.length - 1].focus();
      return;
    }
    prevItem.focus();
  }
};

const menuItems = [
  document.querySelector(".profile-menu-head"),
  document.querySelector(".profile-menu-icon"),
  ...document.querySelectorAll(".profile-menu-main a"),
  document.querySelector(".email"),
  document.querySelector(".manage-account"),
  document.querySelector(".log-out"),
];

menuItems.forEach((item, index) => {
  item.addEventListener("keydown", (event) => {
    handleMenuKeyPress(event, index);
  });
});

notificationBell.addEventListener("click", () => {
  alertBox.classList.toggle("show-alert");
  profileMenu.classList.remove("show-menu");
});

notificationBell.addEventListener("keyup", () => {
  if (event.key === "Escape") {
    alertBox.classList.toggle("show-alert");
    profileMenu.classList.remove("show-menu");
  }
});

notificationBell.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    alertBox.classList.toggle("show-alert");
    profileMenu.classList.remove("show-menu");
  }
});

const closeTrial = document.querySelector(".close");
const trial = document.querySelector(".main-header");

closeTrial.addEventListener("click", () => {
  trial.style.display = "none";
});

closeTrial.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    trial.style.display = "none";
  }
});

const setupGuideArrowUp = document.querySelector(".arrow-up");
const setupGuideArrowDown = document.querySelector(".arrow-down");
const articleDiv = document.querySelector(".articles");

setupGuideArrowUp.addEventListener("click", () => {
  setupGuideArrowUp.style.display = "none";
  setupGuideArrowDown.style.display = "block";
  articleDiv.style.display = "none";
});
setupGuideArrowUp.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setupGuideArrowUp.style.display = "none";
    setupGuideArrowDown.style.display = "block";
    articleDiv.style.display = "none";
  }
});

setupGuideArrowDown.addEventListener("click", () => {
  setupGuideArrowUp.style.display = "block";
  setupGuideArrowDown.style.display = "none";
  articleDiv.style.display = "block";
});
setupGuideArrowDown.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setupGuideArrowUp.style.display = "block";
    setupGuideArrowDown.style.display = "none";
    articleDiv.style.display = "block";
  }
});

const articles = document.querySelectorAll(".article");
let progressStage = document.getElementById("progress-stage");
let progressElement = document.querySelector(".progress");
let currentIndex = -1;
const maxWidth = 390;

const handleArticleKeyPress = (event, index) => {
  const lastArticle = index === articles.length - 1;
  const firstArticle = index === 0;
  const nextArticle = articles[index + 1];
  const prevArticle = articles[index - 1];

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    if (lastArticle) {
      articles[0].focus();
      return;
    }
    nextArticle.focus();
  }
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    if (firstArticle) {
      articles[articles.length - 1].focus();
      return;
    }
    prevArticle.focus();
  }
};

articles.forEach((article, index) => {
  const articleContent = article.querySelector(".article-content");
  const checkedIcon = article.querySelector(".article-icon .checked");
  const uncheckedIcon = article.querySelector(".article-icon .unchecked");
  uncheckedIcon.setAttribute("tabindex", "0");
  checkedIcon.setAttribute("tabindex", "0");

  article.addEventListener("keydown", (event) => {
    handleArticleKeyPress(event, index);
  });

  uncheckedIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleIcons(index);
  });
  uncheckedIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      toggleIcons(index);
    }
  });

  checkedIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleIcons(index);
  });
  checkedIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      toggleIcons(index);
    }
  });

  articleContent.addEventListener("blur", () => {
    if (currentIndex !== -1) {
      closeArticle(currentIndex);
    }
  });
  articleContent.addEventListener("click", (event) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && (event.key === "Enter" || event.key === " "))
    ) {
      if (currentIndex !== -1 && currentIndex !== index) {
        closeArticle(currentIndex);
      }
      openArticle(index);
    }
  });
  articleContent.addEventListener("keydown", (event) => {
    const isActivationKey = event.key === "Enter" || event.key === " ";

    if (isActivationKey) {
      event.preventDefault();

      if (currentIndex !== -1 && currentIndex !== index) {
        closeArticle(currentIndex);
      }

      openArticle(index);
    }
  });
});

const closeArticle = (index) => {
  if (index !== -1) {
    const currentArticle = articles[index];
    const currentDescription = currentArticle.querySelector(
      ".content-left .description"
    );
    const currentArticleBtn = currentArticle.querySelector(
      ".content-left .product-btn"
    );
    const currentArticleImage = currentArticle.querySelector(".article-right");

    currentDescription.style.display = "none";
    currentArticleBtn.style.display = "none";
    currentArticleImage.style.display = "none";
    currentArticle.classList.remove("active");
    if (window.innerWidth <= maxWidth) {
      currentArticleImage.style.display = "none";
    }
  }
};

const openArticle = (index) => {
  const currentArticle = articles[index];
  const currentDescription = currentArticle.querySelector(
    ".content-left .description"
  );
  const currentArticleBtn = currentArticle.querySelector(
    ".content-left .product-btn"
  );
  const currentArticleImage = currentArticle.querySelector(".article-right");

  currentDescription.style.display = "flex";
  currentArticleBtn.style.display = "flex";
  currentArticleImage.style.display = "flex";
  currentArticle.classList.add("active");
  if (window.innerWidth <= maxWidth) {
    currentArticleImage.style.display = "none";
  }
  currentIndex = index;
};

const toggleIcons = (index) => {
  const currentArticle = articles[index];
  const currentCheckedIcon = currentArticle.querySelector(
    ".article-icon .checked"
  );
  const currentUncheckedIcon = currentArticle.querySelector(
    ".article-icon .unchecked"
  );
  const currentLoadingIcon = currentArticle.querySelector(
    ".article-icon .loading"
  );
  const uncheckedCircle = currentArticle.querySelector(".unchecked circle");

  const isCheckedIconDisplayed = currentCheckedIcon.style.display === "block";

  if (!isCheckedIconDisplayed) {
    currentUncheckedIcon.style.display = "none";
    currentLoadingIcon.classList.remove("hidden");
    setTimeout(() => {
      currentLoadingIcon.classList.add("hidden");
      currentCheckedIcon.style.display = "block";
      const checkedIcons = document.querySelectorAll(
        ".article-icon .checked[style*='block']"
      );

      progressElement.value = checkedIcons.length;
      progressStage.innerText = checkedIcons.length;
    }, 3000);
    closeArticle(currentIndex);
    const nextIndex = (index + 1) % articles.length;
    openArticle(nextIndex);
  } else {
    currentLoadingIcon.classList.remove("hidden");
    currentUncheckedIcon.style.display = "none";
    currentCheckedIcon.style.display = "none";
    setTimeout(() => {
      currentLoadingIcon.classList.add("hidden");
      currentUncheckedIcon.style.display = "block";
    }, 3000);
    uncheckedCircle.style.strokeDasharray = "4 6";

    const checkedIcons = document.querySelectorAll(
      ".article-icon .checked[style*='block']"
    );
    progressElement.value = checkedIcons.length;
    progressStage.innerText = checkedIcons.length;
  }
  closeArticle(currentIndex);
  openArticle(index);
};
