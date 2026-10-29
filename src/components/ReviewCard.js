function initReviewCards() {
    document.querySelectorAll(".review-card").forEach((card) => {
        if (card.dataset.initialized) return;
        card.dataset.initialized = "true";

        const content = card.querySelector(".content");
        const button = card.querySelector(".read-more");

        if (!content || !button) return;

        const collapsedHeight = content.clientHeight;
        const fullHeight = content.scrollHeight;

        // Only show button when text overflows
        if (fullHeight <= collapsedHeight + 1) return;

        button.style.display = "block";

        content.style.setProperty(
            "--full-height",
            `${fullHeight}px`
        );

        const originalHeight = card.offsetHeight;

        button.addEventListener("click", () => {
            const expanded = card.classList.contains("expanded");

            if (!expanded) {
                const extraHeight = fullHeight - collapsedHeight;

                card.style.setProperty(
                    "--expanded-height",
                    `${originalHeight + extraHeight + 16}px`
                );

                card.classList.add("expanded");
                content.classList.add("expanded");

                button.textContent = "Weniger";
            } else {
                card.classList.remove("expanded");
                content.classList.remove("expanded");

                button.textContent = "Mehr";
            }
        });
    });
}

initReviewCards();

document.addEventListener("astro:page-load", initReviewCards);