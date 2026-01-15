// Simple Finance Manager
class FinanceManager {
    constructor() {
        this.user = {
            monthlyIncome: 0,
            name: 'You'
        };
        this.expenses = [];
        this.loadFromStorage();
    }

    // Storage methods
    saveToStorage() {
        localStorage.setItem('financeData', JSON.stringify({
            user: this.user,
            expenses: this.expenses
        }));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('financeData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.user = data.user || { monthlyIncome: 0, name: 'You' };
                this.expenses = data.expenses || [];
            } catch (e) {
                console.error('Error loading data:', e);
                this.resetData();
            }
        }
    }

    resetData() {
        this.user = { monthlyIncome: 0, name: 'You' };
        this.expenses = [];
        this.saveToStorage();
    }

    // User methods
    setMonthlyIncome(income) {
        this.user.monthlyIncome = parseFloat(income) || 0;
        this.saveToStorage();
    }

    // Expense methods
    addExpense(amount, category, description) {
        const expense = {
            id: Date.now().toString(),
            amount: parseFloat(amount),
            category: category,
            description: description,
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };

        this.expenses.unshift(expense);
        this.saveToStorage();
        return expense;
    }

    deleteExpense(id) {
        const index = this.expenses.findIndex(e => e.id === id);
        if (index !== -1) {
            this.expenses.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Calculations
    getTotalExpenses() {
        return this.expenses
            .filter(e => e.category !== 'savings')
            .reduce((sum, e) => sum + e.amount, 0);
    }

    getTotalSavings() {
        return this.expenses
            .filter(e => e.category === 'savings')
            .reduce((sum, e) => sum + e.amount, 0);
    }

    getRemainingBalance() {
        return this.user.monthlyIncome - this.getTotalExpenses();
    }

    // Formatting
    formatCurrency(amount) {
        return 'R' + (amount || 0).toLocaleString('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-ZA', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    getCategoryName(category) {
        const categories = {
            groceries: 'Groceries',
            transportation: 'Transportation',
            toiletries: 'Toiletries',
            clothes: 'Clothes & Accessories',
            haircuts: 'Hair Cuts',
            savings: 'Savings',
            other: 'Other'
        };
        return categories[category] || category;
    }
}

// Main Application
class FinanceApp {
    constructor() {
        this.finance = new FinanceManager();
        this.initializeApp();
    }

    initializeApp() {
        // Hide loading screen immediately
        this.hideLoadingScreen();
        
        // Check if setup is needed
        if (this.finance.user.monthlyIncome === 0) {
            this.showSetupModal();
        } else {
            this.showMainApp();
        }

        this.setupEventListeners();
        this.updateUI();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }

    showSetupModal() {
        const modal = document.getElementById('setup-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideSetupModal() {
        const modal = document.getElementById('setup-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showMainApp() {
        const mainApp = document.getElementById('main-app');
        if (mainApp) {
            mainApp.style.display = 'block';
        }
    }

    showExpenseModal() {
        const modal = document.getElementById('expense-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideExpenseModal() {
        const modal = document.getElementById('expense-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Setup modal
        const saveSetupBtn = document.getElementById('save-setup');
        if (saveSetupBtn) {
            saveSetupBtn.addEventListener('click', () => this.saveSetup());
        }

        // Expense modal buttons
        const addExpenseBtn = document.getElementById('add-expense-btn');
        if (addExpenseBtn) {
            addExpenseBtn.addEventListener('click', () => this.showExpenseModal());
        }

        const saveExpenseBtn = document.getElementById('save-expense');
        if (saveExpenseBtn) {
            saveExpenseBtn.addEventListener('click', () => this.saveExpense());
        }

        const cancelExpenseBtn = document.getElementById('cancel-expense');
        if (cancelExpenseBtn) {
            cancelExpenseBtn.addEventListener('click', () => this.hideExpenseModal());
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    saveSetup() {
        const incomeInput = document.getElementById('income-input');
        const income = parseFloat(incomeInput.value);
        
        if (!income || income <= 0) {
            alert('Please enter a valid monthly income');
            return;
        }

        this.finance.setMonthlyIncome(income);
        this.hideSetupModal();
        this.showMainApp();
        this.updateUI();
        
        // Show welcome message
        this.showNotification('Welcome to Mpho Finance Manager!', 'success');
    }

    saveExpense() {
        const amountInput = document.getElementById('amount-input');
        const categoryInput = document.getElementById('category-input');
        const descriptionInput = document.getElementById('description-input');

        const amount = parseFloat(amountInput.value);
        const category = categoryInput.value;
        const description = descriptionInput.value.trim();

        if (!amount || amount <= 0) {
            this.showNotification('Please enter a valid amount', 'error');
            return;
        }

        if (!description) {
            this.showNotification('Please enter a description', 'error');
            return;
        }

        this.finance.addExpense(amount, category, description);
        this.hideExpenseModal();
        this.updateUI();
        
        // Clear form
        amountInput.value = '';
        descriptionInput.value = '';
        
        this.showNotification('Expense added successfully!', 'success');
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.finance.deleteExpense(id);
            this.updateUI();
            this.showNotification('Expense deleted', 'info');
        }
    }

    updateUI() {
        // Update summary
        document.getElementById('income-display').textContent = 
            this.finance.formatCurrency(this.finance.user.monthlyIncome);
        
        document.getElementById('expenses-display').textContent = 
            this.finance.formatCurrency(this.finance.getTotalExpenses());
        
        document.getElementById('balance-display').textContent = 
            this.finance.formatCurrency(this.finance.getRemainingBalance());

        // Update expenses list
        this.updateExpensesList();
    }

    updateExpensesList() {
        const container = document.getElementById('expenses-container');
        const expenses = this.finance.expenses.slice(0, 10); // Show only 10 most recent

        if (expenses.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-receipt"></i>
                    <p>No expenses yet</p>
                    <button class="btn btn-primary" onclick="app.showExpenseModal()">
                        Add your first expense
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = expenses.map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <h4>${expense.description}</h4>
                    <p>${this.finance.getCategoryName(expense.category)} • ${this.finance.formatDate(expense.date)}</p>
                </div>
                <div class="expense-amount ${expense.category === 'savings' ? 'positive' : 'negative'}">
                    ${expense.category === 'savings' ? '+' : '-'}${this.finance.formatCurrency(expense.amount)}
                </div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FinanceApp();
});

// button to reset data
document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
        app.finance.resetData();
        app.initializeApp();
        app.showNotification('All data has been reset.', 'info');
    }
});