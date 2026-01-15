# Personal-Finance-Manager-ZAR
My finance assistant manager, tracks monthly expenses, and helps me improve my financial expenditure.

# Personal Finance Manager - ZAR (Rands)

A beautiful, interactive web-based personal finance manager for tracking expenses and budgets in South African Rands.

## Features

- 📊 **Real-time Dashboard** - See your financial overview at a glance
- 💰 **Budget Tracking** - Set and monitor budgets for 7 categories
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 📈 **Visual Charts** - Doughnut chart showing spending distribution
- 💡 **Smart Advice** - Get personalized financial advice
- 💾 **Data Persistence** - Automatically saves to browser storage
- 📥 **Data Export** - Export your financial data as JSON
- 🎯 **Savings Goals** - Set and track savings targets

## Categories Included

1. **Groceries** - Food and household supplies
2. **Transportation** - Fuel, public transport, Uber
3. **Toiletries** - Personal care products
4. **Clothes & Accessories** - Clothing and accessories
5. **Hair Cuts** - Personal grooming
6. **Savings** - Money set aside for future
7. **Other** - Miscellaneous expenses

## Getting Started

1. **Open the application** by opening `index.html` in your web browser
2. **Set your monthly income** by clicking "Setup Income" in the header
3. **Configure your budgets** by clicking "Edit" in the Budget Categories section
4. **Start adding expenses** using the "Add Expense" button
5. **Set savings goals** to track your progress

## Using the Application

### Adding Expenses
1. Click the green "Add Expense" button
2. Enter the amount in Rands
3. Select a category
4. Add a description
5. Mark as recurring if it's a monthly expense
6. Click "Add Expense"

### Setting Budgets
1. Click "Edit" in the Budget Categories section
2. Enter budget amounts for each category
3. Use "Auto-Calculate Budgets" for suggested amounts based on your income
4. Click "Save All Budgets"

### Viewing Reports
1. Click "Generate Report" in the Quick Actions
2. View detailed financial breakdown
3. Print or download the report

### Exporting Data
1. Click "Export Data" in the footer
2. A JSON file will be downloaded with all your data
3. Keep this file for backup or import later

## Tips for Success

1. **Be Consistent** - Add expenses as soon as you spend money
2. **Review Weekly** - Check your progress every Sunday
3. **Adjust as Needed** - Your budget should be flexible
4. **Set Realistic Goals** - Start with achievable savings targets
5. **Use Categories Wisely** - Be specific but not overly detailed

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- Uses Chart.js for data visualization
- Data stored in browser's local storage
- No server required - runs entirely in browser
- Works offline after first load

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

You can easily customize:
- Budget categories in `script.js` (FinanceManager constructor)
- Colors in `style.css` (:root variables)
- Chart types in `script.js` (updateChart method)

## Troubleshooting

**Q: My data disappeared!**
A: Make sure you haven't cleared browser data. Always export your data regularly.

**Q: The chart isn't showing**
A: Make sure you have an internet connection for Chart.js to load.

**Q: Can I add more categories?**
A: Yes, edit the `budgets` object in the FinanceManager constructor.

## License

Free to use for personal financial management.
