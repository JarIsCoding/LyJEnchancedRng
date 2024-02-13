import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

let range = document.getElementById('range')
let nameinput = document.getElementById('nameinput')
let namebtn = document.getElementById('namebtn')
let groupbtn = document.getElementById('groupbtn')
let groupnum = document.getElementById('groupnum')
let toptxt = document.getElementById('toptxt')
let namesdiv = document.getElementById('namesdiv')
let totname = document.getElementById('totname')
let randombtn = document.getElementById('randombtn')

let maxnum = 0;
range.max = maxnum;
range.addEventListener('input', () => {
    groupnum.textContent = range.value;
});

namebtn.addEventListener('click', () => {
    if (nameinput.value === '') {
        toptxt.textContent = 'Please Enter a Name'
    } else {
        toptxt.textContent = 'Add names, then make them into groups';

        let newP = document.createElement('p');
        newP.textContent = nameinput.value.charAt(0).toUpperCase() + nameinput.value.slice(1);

        let hr = document.createElement('hr');
        let hr2 = document.createElement('hr');


        let button = document.createElement('button');

        button.type = "button"
        button.textContent = "Remove Name";
        button.type = 'button'
        button.classList.add('btn', 'btn-danger')

        button.addEventListener('click', () => {

            removeFromLocalStorage(nameinput.value);

            newP.remove();
            button.remove()
            hr.remove();
            hr2.remove();
            maxnum--
            range.max = maxnum;
            groupnum.textContent = range.value;
            totname.textContent = 'Total Names: ' + maxnum
        })

        namesdiv.appendChild(hr2)
        namesdiv.appendChild(newP)
        namesdiv.appendChild(button)
        namesdiv.appendChild(hr)

        maxnum++;
        range.max = maxnum;
        groupnum.textContent = range.value;
        totname.textContent = 'Total Names: ' + maxnum

        saveToLocalStorage(nameinput.value);
    }
})

nameinput.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        if (nameinput.value === '') {
            toptxt.textContent = 'Please Enter a Name'
        } else {
            toptxt.textContent = 'Add names, then make them into groups';
    
            let newP = document.createElement('p');
            newP.textContent = nameinput.value.charAt(0).toUpperCase() + nameinput.value.slice(1);
    
            let hr = document.createElement('hr');
            let hr2 = document.createElement('hr');
    
    
            let button = document.createElement('button');
    
            button.type = "button"
            button.textContent = "Remove Name";
            button.type = 'button'
            button.classList.add('btn', 'btn-danger')
    
            button.addEventListener('click', () => {
    
                removeFromLocalStorage(nameinput.value);
    
                newP.remove();
                button.remove()
                hr.remove();
                hr2.remove();
                maxnum--
                range.max = maxnum;
                groupnum.textContent = range.value;
                totname.textContent = 'Total Names: ' + maxnum
            })
    
            namesdiv.appendChild(hr2)
            namesdiv.appendChild(newP)
            namesdiv.appendChild(button)
            namesdiv.appendChild(hr)
    
            maxnum++;
            range.max = maxnum;
            groupnum.textContent = range.value;
            totname.textContent = 'Total Names: ' + maxnum
    
            saveToLocalStorage(nameinput.value);
        }
    }
})

let stored = getlocalStorage()
stored.map(name => {
    let newP = document.createElement('p');
    newP.textContent = name.charAt(0).toUpperCase() + name.slice(1);

    let hr = document.createElement('hr');
    let hr2 = document.createElement('hr');


    let button = document.createElement('button');

    button.type = "button"
    button.textContent = "Remove Name";
    button.type = 'button'
    button.classList.add('btn', 'btn-danger')

    button.addEventListener('click', () => {

        removeFromLocalStorage(name);

        newP.remove();
        button.remove()
        hr.remove();
        hr2.remove();
        maxnum--
        range.max = maxnum;
        groupnum.textContent = range.value;
        totname.textContent = 'Total Names: ' + maxnum
    })

    namesdiv.appendChild(hr2)
    namesdiv.appendChild(newP)
    namesdiv.appendChild(button)
    namesdiv.appendChild(hr)

    maxnum++;
    range.max = maxnum;
    groupnum.textContent = range.value;
    totname.textContent = 'Total Names: ' + maxnum
})

console.log(stored.length)

groupbtn.addEventListener('click', () => {
    let storedNames = getlocalStorage();
    
    let numGroups = range.value;
    
    let namesPerGroup = Math.floor(storedNames.length / numGroups);
    
    let remainingNames = storedNames.length % numGroups;
    
    storedNames.sort(() => Math.random() - 0.5);
    
    let groups = [];
    let startIndex = 0;

    for (let i = 0; i < numGroups; i++) {
        let groupSize = namesPerGroup + (i < remainingNames ? 1 : 0);

        groups.push(storedNames.slice(startIndex, startIndex + groupSize));
        
        startIndex += groupSize;
    }
    
    let modalContent = '';
    for (let i = 0; i < groups.length; i++) {
        modalContent += `Group ${i + 1}: \n` + ' ';

        groups[i].forEach(name => {
            modalContent += ` ${name.charAt(0).toUpperCase() + name.slice(1)} \n `;
        });

        modalContent += '\n';
    }
    
    document.getElementById('modaltxt').innerText = modalContent;
    document.getElementById('exampleModalLabel').innerText = 'Your Randomly Created Groups';

});

randombtn.addEventListener('click', () => {
    let storedNames = getlocalStorage();

    storedNames.sort(() => Math.random() - 0.5);

    document.getElementById('modaltxt').innerText = storedNames[0].charAt(0).toUpperCase() + storedNames[0].slice(1);
    document.getElementById('exampleModalLabel').innerText = 'Your Randomly Selected Person';
})