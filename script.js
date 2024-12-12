document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mixDesignForm');
    const results = document.getElementById('results');
    const strengthResult = document.getElementById('strengthResult');
    const suggestions = document.getElementById('suggestions');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cementContent = parseFloat(document.getElementById('cementContent').value);
        const waterCementRatio = parseFloat(document.getElementById('waterCementRatio').value);
        const fineAggregate = parseFloat(document.getElementById('fineAggregate').value);
        const coarseAggregate = parseFloat(document.getElementById('coarseAggregate').value);
        const admixtureDosage = parseFloat(document.getElementById('admixtureDosage').value);

        // Calculate strength (this is a simplified model and should be replaced with a more accurate one)
        const strength = calculateStrength(cementContent, waterCementRatio, admixtureDosage);

        // Display results
        strengthResult.textContent = `Estimated Concrete Strength: ${strength.toFixed(2)} MPa`;
        
        // Generate and display suggestions
        const suggestionsList = generateSuggestions(cementContent, waterCementRatio, fineAggregate, coarseAggregate, admixtureDosage);
        suggestions.innerHTML = '';
        suggestionsList.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestions.appendChild(li);
        });

        results.classList.remove('hidden');
    });
});

function calculateStrength(cementContent, waterCementRatio, admixtureDosage) {
    // This is a simplified model and should be replaced with a more accurate one
    const baseStrength = 40 * (1 - waterCementRatio) * (1 + admixtureDosage / 100);
    const cementFactor = cementContent / 350; // Assuming 350 kg/m³ as a reference
    return baseStrength * cementFactor;
}

function generateSuggestions(cementContent, waterCementRatio, fineAggregate, coarseAggregate, admixtureDosage) {
    const suggestions = [];

    if (waterCementRatio > 0.5) {
        suggestions.push("Reduce the water-cement ratio to improve strength. Consider using water-reducing admixtures to maintain workability.");
    }

    if (cementContent < 350) {
        suggestions.push("Increase the cement content to potentially improve strength. Aim for at least 350 kg/m³ for structural concrete.");
    }

    if (admixtureDosage < 1.0) {
        suggestions.push("Consider increasing the admixture dosage to improve strength and workability. Consult the admixture manufacturer for optimal dosage.");
    }

    const totalAggregate = fineAggregate + coarseAggregate;
    const fineAggregateRatio = fineAggregate / totalAggregate;

    if (fineAggregateRatio < 0.35 || fineAggregateRatio > 0.45) {
        suggestions.push("Adjust the fine aggregate to coarse aggregate ratio. Aim for a ratio between 0.35 and 0.45 for optimal strength and workability.");
    }

    if (suggestions.length === 0) {
        suggestions.push("Your current mix design appears to be well-balanced. Consider fine-tuning based on specific project requirements and conduct trial mixes to verify performance.");
    }

    return suggestions;
}

