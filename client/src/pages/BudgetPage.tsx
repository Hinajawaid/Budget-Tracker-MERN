import BudgetTable from '../components/BudgetTable'

export default function BudgetPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <div style={{ marginTop: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <BudgetTable />

            </div>
        </div>
    )
}
