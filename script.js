let allSkills = [];
let allFeats = [];

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

// tabs

let currentLibrary =
    "modules";


    function initializeTabs() {

    const tabs =
        document.querySelectorAll(
            ".library-tab"
        );

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {
                console.log(
                    "Clicked.",
                    tab.dataset.library
                )
                tabs.forEach(t =>
                    t.classList.remove(
                        "active"
                    )
                );

                tab.classList.add(
                    "active"
                );

                currentLibrary =
                    tab.dataset.library;

                loadCurrentLibrary();

            }
        );

    });

}

function loadCurrentLibrary() {

const tierPanel =
    document.getElementById(
        "tier-section"
    );

const statusPanel =
    document.getElementById(
        "status-section"
    );

const tagPanel =
    document.getElementById(
        "tag-section"
    );

const effectPanel =
    document.getElementById(
        "effect-section"
    );

const sourcePanel =
    document.getElementById(
        "source-section"
    );


    const searchBar =
    document.getElementById(
        "search-bar"
    );

tierPanel.style.display = "none";
statusPanel.style.display = "none";
tagPanel.style.display = "none";
effectPanel.style.display = "none";
sourcePanel.style.display = "none";

    switch (currentLibrary) {

    case "modules":

tierPanel.style.display = "block";
statusPanel.style.display = "block";
tagPanel.style.display = "block";
effectPanel.style.display = "block";
sourcePanel.style.display = "block";

        searchBar.placeholder =
            "Search skill modules...";

        applyModuleFilters();

        break;

    case "feats":

statusPanel.style.display = "block";
sourcePanel.style.display = "block";

        searchBar.placeholder =
            "Search feats...";

        applyFeatFilters();

        break;
}

    switch (
        currentLibrary
    ) {

        case "modules":

            applyModuleFilters();

            break;

        case "templates":

    document.getElementById(
        "skills-container"
    ).innerHTML =
        "<h2>Templates Coming Soon</h2>";

    break;

        case "feats":
  
            applyFeatFilters();

            break;
    }

}

// FilterStates

const tierFilterStates = {};

const statusFilterStates = {};

const tagFilterStates = {};

const effectFilterStates = {};

const sourceFilterStates = {};


// Build skills

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

function renderModules(records) {

    console.log("rendering mods",records.length);

    const container =
        document.getElementById("skills-container");

    container.innerHTML = "";

    records.forEach(skill => {

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
        desc.className = "card-description";
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

function renderFeats(records) {

    const container =
        document.getElementById(
            "skills-container"
        );

    container.innerHTML = "";

    records.forEach(feat => {

    let sourceClass = "source-default";

    if (feat.source === "SoTC Core") {
        sourceClass = "source-core";
    }
    else if (feat.source === "Community Expansion") {
        sourceClass = "source-community";
    }
    else if (feat.source === "City Supplement") {
        sourceClass = "source-supplement";
    }

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "skill-card";

        card.innerHTML = `

    <div class="card-header">

        <div class="skill-name">
            ${feat.name}
        </div>

        <div class="source-badge ${sourceClass}">
            ${feat.source}
        </div>

    </div>

        <div>
                <p class="skill-subline ">${feat.featType}${feat.hasprereq ? ", Req. ": ""}${feat.prerequisite}</p>
            </div>


`;

        container.appendChild(
            card
        );

                const desc = document.createElement("div");
        desc.className = "card-description";
        desc.innerHTML =
         formatDescription(feat.description);


        card.appendChild(desc);

    });

}

async function loadLibrary() {

    allSkills =
        await loadData(
            "skill-modules.json"
        );
    
    allFeats =
       await loadData(
           "feats.json"
       );

    initializeTabs();

    buildTierFilters();
    buildStatusFilters();
    buildTagFilters();
    buildEffectFilters();
    buildSourceFilters();

    renderModules(allSkills);

    applyModuleFilters();

    updateResultsCount(
        allSkills.length
    );
}

// Helper Functions

async function loadData(fileName) {

    const response =
        await fetch(
            `data/${fileName}`
        );

    return await response.json();
}

function cycleFilterState(
    stateObject,
    key,
    button
) {

    stateObject[key] =
        (stateObject[key] + 1) % 3;

    updateTriStateButton(
        button,
        key,
        stateObject[key]
    );

    applyFilters();
}

function updateTriStateButton(
    button,
    label,
    state
) {

    button.textContent = label;

    button.classList.remove(
        "filter-neutral",
        "filter-include",
        "filter-exclude"
    );

    if (state === 0) {

        button.classList.add(
            "filter-neutral"
        );

    }
    else if (state === 1) {

        button.classList.add(
            "filter-include"
        );

    }
    else {

        button.classList.add(
            "filter-exclude"
        );

    }
}

function matchesTriStateFilter(
    stateObject,
    skillValues
) {

    const included =
        Object.keys(stateObject)
            .filter(key =>
                stateObject[key] === 1
            );

    const excluded =
        Object.keys(stateObject)
            .filter(key =>
                stateObject[key] === 2
            );

    const matchesIncluded =

        included.length === 0 ||

        included.some(value =>
            skillValues.includes(value)
        );

    const matchesExcluded =

        excluded.every(value =>
            !skillValues.includes(value)
        );

    return (
        matchesIncluded &&
        matchesExcluded
    );
}

function noSourceFiltersSelected() {

    return Object.values(
        sourceFilterStates
    ).every(
        state => state === 0
    );

}

// Build Filters

function buildTierFilters() {

    const container =
        document.getElementById(
            "tier-filters"
        );

    container.innerHTML = "";

    [1, 2, 3].forEach(tier => {

        tierFilterStates[tier] = 0;

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "tier-filter";

     updateTriStateButton(
    button,
    tier,
    0
);

        button.addEventListener(
            "click",
            () => {

                cycleFilterState(
                    tierFilterStates,
                    tier,
                    button
                );

            }
        );

        container.appendChild(
            button
        );

    });

}

function buildStatusFilters() {
    
    const container =
        document.getElementById("status-filters");

        container.innerHTML = "";

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


        statusFilterStates[status] = 0;

        const button =
    document.createElement("button");

button.className = "status-filter";

button.textContent = `${status}`;
        
updateTriStateButton(
    button,
    status,
    0
);

    button.addEventListener("click", () => {

    cycleFilterState(
        statusFilterStates,
        status,
        button
    );

});

        container.appendChild(button);

    });

    
}

function buildTagFilters() {

    const container =
        document.getElementById("tag-filters");

          container.innerHTML = "";

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

        tagFilterStates[tag] = 0;

        const button =
    document.createElement("button");

button.className = "tag-filter";

button.textContent = `${tag}`;

updateTriStateButton(
    button,
    tag,
    0
);

button.addEventListener("click", () => {

    cycleFilterState(
        tagFilterStates,
        tag,
        button
    );

});

        container.appendChild(button);

    });
    
}

function buildEffectFilters() {

    const container =
        document.getElementById(
            "effect-filters"
        );

    container.innerHTML = "";

    const allEffects =
        new Set();

    allSkills.forEach(skill => {

        skill.effects.forEach(effect => {

            allEffects.add(effect);

        });

    });

    [...allEffects]
        .sort()
        .forEach(effect => {

            effectFilterStates[
                effect
            ] = 0;

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "effect-filter";

            updateTriStateButton(
                button,
                effect,
                0
            );

            button.addEventListener(
                "click",
                () => {

                    cycleFilterState(
                        effectFilterStates,
                        effect,
                        button
                    );

                    updateTriStateButton(
                        button,
                        effect,
                        effectFilterStates[
                            effect
                        ]
                    );

                    applyModuleFilters();
                }
            );

            container.appendChild(
                button
            );

        });

}

function buildSourceFilters() {

    const container =
        document.getElementById("source-filters");

          container.innerHTML = "";

 const allSources =
    new Set();

allSkills.forEach(skill => {

    if (skill.source) {

        allSources.add(
            skill.source
        );

    }

});

    const sortedSources =
        [...allSources].sort();

    sortedSources.forEach(source => {

        sourceFilterStates[source] = 0;

        const button =
    document.createElement("button");

button.className = "source-filter";

button.textContent = `${source}`;

updateTriStateButton(
    button,
    source,
    0
);

button.addEventListener("click", () => {

    cycleFilterState(
        sourceFilterStates,
        source,
        button
    );

});

        container.appendChild(button);

    });
}

// Apply Filters

function applyModuleFilters() {

    const searchTerm =
        document
            .getElementById("search-bar")
            .value
            .toLowerCase();
    Array.from(
        document.querySelectorAll(
            '#source-filters input:checked'
        )
    )
    .map(cb => cb.value);

    const selectedTags =
    Array.from(
        document.querySelectorAll(
            "#tag-filters input:checked"
        )
    )
    .map(input => input.value);


        console.log("Applying mod filters");
    
    const filteredSkills =
        allSkills.filter(skill => {

            const matchesSearch =
                skill.name
                    .toLowerCase()
                    .includes(searchTerm);

const matchesTier =
    matchesTriStateFilter(
        tierFilterStates,
        [String(skill.tier)]
    );

const matchesSource =

    noSourceFiltersSelected()

        ? skill.source === "SoTC Core"

        : matchesTriStateFilter(
            sourceFilterStates,
            [skill.source]
        );


 const matchesStatus =
    matchesTriStateFilter(
        statusFilterStates,
        skill.statuses
    );

const matchesTags =
    matchesTriStateFilter(
        tagFilterStates,
        skill.tags
    );

const matchesEffects =
    matchesTriStateFilter(
        effectFilterStates,
        skill.effects
    );

    console.log({
    name: skill.name,
    matchesSearch,
    matchesTier,
    matchesStatus,
    matchesTags,
    matchesSource,
    matchesEffects
});

    console.log(searchTerm);

    return matchesSearch && 
           matchesTier && 
           matchesStatus && 
           matchesTags && 
           matchesEffects &&
           matchesSource;
        });

filteredSkills.sort((a, b) => {

    if (a.tier !== b.tier) {

        return a.tier - b.tier;

    }

    return a.name.localeCompare(
        b.name
    );

});


    renderModules(filteredSkills);

    updateResultsCount(filteredSkills.length);
}

function applyFeatFilters() {

    const searchTerm =
        document
            .getElementById("search-bar")
            .value
            .toLowerCase();
    Array.from(
        document.querySelectorAll(
            '#source-filters input:checked'
        )
    )
    .map(cb => cb.value);

    const selectedTags =
    Array.from(
        document.querySelectorAll(
            "#tag-filters input:checked"
        )
    )
    .map(input => input.value);


        console.log("Applying feat filters");
    
    const filteredFeats =
        allFeats.filter(feat => {

            const matchesSearch =
                feat.name
                    .toLowerCase()
                    .includes(searchTerm);

const matchesSource =

    noSourceFiltersSelected()

        ? feat.source === "SoTC Core"

        : matchesTriStateFilter(
            sourceFilterStates,
            [feat.source]
        );


 const matchesStatus =
    matchesTriStateFilter(
        statusFilterStates,
        feat.statuses
    );

    console.log({
    name: feat.name,
    matchesSearch,
    matchesStatus,
    matchesSource,
});

    console.log(searchTerm);

    return matchesSearch && 
           matchesStatus && 
           matchesSource;
        });

const featTypeOrder = {
    "General": 1,
    "Core": 2,
    "Feats with Prerequisites": 3,
    "Status-Focused": 4
};

filteredFeats.sort((a, b) => {

    const typeA =
        featTypeOrder[a.featType] || 999;

    const typeB =
        featTypeOrder[b.featType] || 999;

    if (typeA !== typeB) {

        return typeA - typeB;

    }

    return a.name.localeCompare(
        b.name
    );

});


    renderFeats(filteredFeats);

    updateResultsCount(filteredFeats.length);
}


function applyFilters() {

    switch (currentLibrary) {

        case "modules":

            applyModuleFilters();
            break;

        case "feats":

            applyFeatFilters();
            break;
    }
}


function updateResultsCount(filteredCount) 
{

        const countElement =
        document.getElementById("results-count");

    const resultsCounter =
        document.getElementById(
            "results-count"
        );

    switch (currentLibrary) {

        case "modules":

            if (filteredCount === allSkills.length) {

        countElement.textContent =
            `Showing all ${allSkills.length} modules.`;

    } else {

        countElement.textContent =
            `Showing ${filteredCount} of ${allSkills.length} modules.`;

    }
            break;

        case "feats":

            if (filteredCount === allFeats.length) {

        countElement.textContent =
            `Showing all ${allFeats.length} feats.`;

    } else {

        countElement.textContent =
            `Showing ${filteredCount} of ${allFeats.length} feats.`;

    }

            break;
    }

};

document
    .getElementById("search-bar")
    .addEventListener("input", applyFilters);

loadLibrary();