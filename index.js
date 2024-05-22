document.addEventListener('DOMContentLoaded', function () {
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    window.splitPartition = function (partition, direction) {
        const parent = partition.parentElement;
        const newPartition = document.createElement('div');
        newPartition.className = 'partition';
        newPartition.style.backgroundColor = getRandomColor();
        
        newPartition.appendChild(createButtons());
        const oldColor = partition.style.backgroundColor;

        if (direction === 'V') {
            partition.style.flexDirection = 'row';
        } else {
            partition.style.flexDirection = 'column';
        }

        partition.style.backgroundColor = oldColor;
        partition.appendChild(newPartition);

        adjustPartitions(partition, direction);
    };

    function createButtons() {
        const container = document.createElement('div');
        
        const vBtn = document.createElement('button');
        vBtn.innerText = 'V';
        vBtn.className = 'split-btn';
        vBtn.onclick = function () {
            splitPartition(this.parentElement.parentElement, 'V');
        };

        const hBtn = document.createElement('button');
        hBtn.innerText = 'H';
        hBtn.className = 'split-btn';
        hBtn.onclick = function () {
            splitPartition(this.parentElement.parentElement, 'H');
        };

        const rBtn = document.createElement('button');
        rBtn.innerText = '-';
        rBtn.className = 'remove-btn';
        rBtn.onclick = function () {
            removePartition(this.parentElement.parentElement);
        };

        container.appendChild(vBtn);
        container.appendChild(hBtn);
        container.appendChild(rBtn);

        return container;
    }

    window.removePartition = function (partition) {
        const parent = partition.parentElement;
        parent.removeChild(partition);
    };

    function adjustPartitions(partition, direction) {
        const partitions = partition.children;
        for (let i = 0; i < partitions.length; i++) {
            partitions[i].style.flex = '1 1 0';
        }
    }

    // Initialization
    const initialPartition = document.getElementById('partition-container');
    initialPartition.appendChild(createButtons());
});
