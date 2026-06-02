let allSkills = [];

const statusIcons = {
    "Aggro": '<img src="icons/Aggro.png" class="status-icon">',
    "Bind": '<img src="icons/Bind.png" class="status-icon">',
    "Bleed": '<img src="icons/Bleed.png" class="status-icon">',
    "Burn": '<img src="icons/Burn.png" class="status-icon">',
    "Charge": '<img src="icons/Charge.png" class="status-icon">',
    "Disarm": '<img src="icons/Disarm.png" class="status-icon">',
    "Endurance": '<img src="icons/Endurance.png" class="status-icon">',
    "Feeble": '<img src="icons/Feeble.png" class="status-icon">',
    "Fragile": '<img src="icons/Fragile.png" class="status-icon">',
    "Haste": '<img src="icons/Haste.png" class="status-icon">',
    "Paralyze": '<img src="icons/Paralyze.png" class="status-icon">',
    "Poise": '<img src="icons/Poise.png" class="status-icon">',
    "Protection": '<img src="icons/Protection.png" class="status-icon">',
    "Resolve": '<img src="icons/Resolve.png" class="status-icon">',
    "Safeguard": '<img src="icons/Safeguard.png" class="status-icon">',
    "Sinking": '<img src="icons/Sinking.png" class="status-icon">',
    "Strength": '<img src="icons/Strength.png" class="status-icon">',
    "Thorns": '<img src="icons/Thorns.png" class="status-icon">',
    "Tremor": '<img src="icons/Tremor.png" class="status-icon">'
};

function formatDescription(text) {

    let formatted = text;

    Object.entries(statusIcons).forEach(([status, icon]) => {

        const regex = new RegExp(`\\b${status}\\b`, "g");

        formatted =
            formatted.replace(
                regex,
                `${status}${icon}`
            );
    });

    return formatted;
}

function renderSkills(skills) {

    const container =
        document.getElementById("skills-container");

    container.innerHTML = "";

    skills.forEach(skill => {

        const card = document.createElement("div");


    let sourceClass = "source-default";

    if (skill.source === "SoTC Core") {
        sourceClass = "source-core";
    }
    else if (skill.source === "Community Expansion") {
        sourceClass = "source-community";
    }
    else if (skill.source === "City Supplement") {
        sourceClass = "source-supplement";
    }

            const contributorText =
        skill.contributor
        ? `<p class="contributor">
               (Community Contributor: ${skill.contributor})
           </p>`
        : "";

        card.className = "skill-card";

        let tierClass = "";

if (skill.tier === 1) {
    tierClass = "tier-1";
}
else if (skill.tier === 2) {
    tierClass = "tier-2";
}
else if (skill.tier === 3) {
    tierClass = "tier-3";
}

        card.innerHTML = `
            <div class="card-header">

             <div class="skill-name">
             ${skill.name}
            </div>

            <div class="source-badge ${sourceClass}">
             ${skill.source}
             </div>

</div>

            <div>
                <p class="skill-subline ${tierClass}">Tier ${skill.tier}${skill.repeating ? ", Repeating" : ""}</p>
            </div>

           
        `;

        const desc = document.createElement("div");
        desc.className = "skill-description";
        desc.innerHTML =
         formatDescription(skill.description);


        card.appendChild(desc);



if (skill.contributor) {

    const contributor = document.createElement("p");

    contributor.className = "contributor";

    contributor.textContent =
        `(Community Contributor: ${skill.contributor})`;

    card.appendChild(contributor);
}
        container.appendChild(card);
        
    });
}

async function loadSkills() {

    const response = await fetch("data/skill-modules.json");

    allSkills = await response.json();

    buildStatusFilters();
    buildTagFilters();
    buildSourceFilters();

    renderSkills(allSkills);

    updateResultsCount(
       allSkills.length
);
}

function buildStatusFilters() {

    
    const container =
        document.getElementById("status-filters");

    const allStatuses =
        new Set();

    allSkills.forEach(skill => {

        skill.statuses.forEach(status => {

            allStatuses.add(status);

        });

    });

    const sortedStatuses =
        [...allStatuses].sort();

    sortedStatuses.forEach(status => {

        const label =
            document.createElement("label");

        label.innerHTML = `
            <input
                type="checkbox"
                value="${status}"
            >
            ${status}
        `;
        
        const checkbox =
          label.querySelector("input");

        checkbox.addEventListener(
          "change",
         applyFilters
);

        container.appendChild(label);

    });

    
}

function buildTagFilters() {

    const container =
        document.getElementById("tag-filters");

    const allTags =
        new Set();

    allSkills.forEach(skill => {

        skill.tags.forEach(tag => {

            allTags.add(tag);

        });

    });

    const sortedTags =
        [...allTags].sort();

    sortedTags.forEach(tag => {

        const label =
            document.createElement("label");

        label.innerHTML = `
            <input
                type="checkbox"
                value="${tag}"
            >
            ${tag}
        `;

        const checkbox =
            label.querySelector("input");

        checkbox.addEventListener(
            "change",
            applyFilters
        );

        container.appendChild(label);

    });
}

function buildSourceFilters() {

    const container =
        document.getElementById("source-filters");

    container.innerHTML = "";

    const allSources =
        [...new Set(
            allSkills.map(skill => skill.source)
        )].sort();

    allSources.forEach(source => {

        const label =
            document.createElement("label");

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.value = source;

        checkbox.addEventListener(
            "change",
            applyFilters
        );

        label.appendChild(checkbox);

        label.append(
            document.createTextNode(source)
        );

        container.appendChild(label);

    });
}

function updateResultsCount(filteredCount) {

    const countElement =
        document.getElementById("results-count");

    const totalCount =
        allSkills.length;

    if (filteredCount === totalCount) {

        countElement.textContent =
            `Showing all ${totalCount} modules`;

    } else {

        countElement.textContent =
            `Showing ${filteredCount} of ${totalCount} modules`;

    }
}

function applyFilters() {

    const searchTerm =
        document
            .getElementById("search-bar")
            .value
            .toLowerCase();

    const tier1 =
        document.getElementById("tier-1").checked;

    const tier2 =
        document.getElementById("tier-2").checked;

    const tier3 =
        document.getElementById("tier-3").checked;
    
    const selectedStatuses =
    Array.from(
        document.querySelectorAll(
            "#status-filters input:checked"
        )
    )
    .map(input => input.value);

    const selectedSources =
    Array.from(
        document.querySelectorAll(
            '#source-filters input:checked'
        )
    )
    .map(cb => cb.value);



    const filteredSkills =
        allSkills.filter(skill => {

            const matchesSearch =
                skill.name
                    .toLowerCase()
                    .includes(searchTerm);

            const noTierSelected =
    !tier1 && !tier2 && !tier3;

const matchesTier =

    noTierSelected

    ||

    (skill.tier === 1 && tier1)

    ||

    (skill.tier === 2 && tier2)

    ||

    (skill.tier === 3 && tier3);

            const matchesStatus =

            selectedStatuses.length === 0

            ||

            skill.statuses.some(status =>
               selectedStatuses.includes(status)
             );
            
             const selectedTags =
    Array.from(
        document.querySelectorAll(
            "#tag-filters input:checked"
        )
    )
    .map(input => input.value);

    const matchesTags =

    selectedTags.length === 0

    ||

    skill.tags.some(tag =>
       selectedTags.includes(tag)
     );
    
    const matchesSource =

    selectedSources.length === 0

        ? skill.source === "SoTC Core"

        : selectedSources.includes(
            skill.source
        );

    return matchesSearch && 
           matchesTier && 
           matchesStatus && 
           matchesTags && 
           matchesSource;
        });

    renderSkills(filteredSkills);

    updateResultsCount(filteredSkills.length);
}


document
    .getElementById("search-bar")
    .addEventListener("input", applyFilters);

document
    .getElementById("tier-1")
    .addEventListener("change", applyFilters);

document
    .getElementById("tier-2")
    .addEventListener("change", applyFilters);

document
    .getElementById("tier-3")
    .addEventListener("change", applyFilters);

loadSkills();