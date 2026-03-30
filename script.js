let entries = JSON.parse(localStorage.getItem('macroEntries')) || [];

const form = document.getElementById('macro-form');
const entriesDiv = document.getElementById('entries');
const clearBtn = document.getElementById('clear-all');

function calculateCalories(p, c, f) {
  return Math.round((p * 4) + (c * 4) + (f * 9));
}

function renderEntries() {
  entriesDiv.innerHTML = '';
  let totalP = 0, totalC = 0, totalF = 0;

  entries.forEach((entry, index) => {
    const cal = calculateCalories(entry.protein, entry.carbs, entry.fat);
    totalP += entry.protein;
    totalC += entry.carbs;
    totalF += entry.fat;

    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <div>
        <strong>${entry.name}</strong><br>
        Protein: ${entry.protein}g | Carbs: ${entry.carbs}g | Fat: ${entry.fat}g
      </div>
      <div style="text-align:right">
        ${cal} cal<br>
        <button onclick="deleteEntry(${index})" style="background:none; border:none; color:#ff4500; cursor:pointer;">Remove</button>
      </div>
    `;
    entriesDiv.appendChild(div);
  });

  document.getElementById('total-protein').textContent = totalP.toFixed(1);
  document.getElementById('total-carbs').textContent = totalC.toFixed(1);
  document.getElementById('total-fat').textContent = totalF.toFixed(1);
  document.getElementById('total-calories').textContent = Math.round(totalP*4 + totalC*4 + totalF*9);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('food-name').value.trim();
  const protein = parseFloat(document.getElementById('protein').value) || 0;
  const carbs = parseFloat(document.getElementById('carbs').value) || 0;
  const fat = parseFloat(document.getElementById('fat').value) || 0;

  if (name) {
    entries.push({ name, protein, carbs, fat });
    localStorage.setItem('macroEntries', JSON.stringify(entries));
    renderEntries();
    form.reset();
  }
});

window.deleteEntry = function(index) {
  entries.splice(index, 1);
  localStorage.setItem('macroEntries', JSON.stringify(entries));
  renderEntries();
};

clearBtn.addEventListener('click', () => {
  if (confirm('Clear all entries?')) {
    entries = [];
    localStorage.removeItem('macroEntries');
    renderEntries();
  }
});

renderEntries();
