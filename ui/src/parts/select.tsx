export function Selection(labelname: string, value: any, Fn: React.ChangeEventHandler<HTMLSelectElement>, options: { value: string; name: string; }[]) {
    return (
        <div className="form-selection">
            <label htmlFor="active-tool">{labelname}:</label>
            <select
                value={value}
                onChange={Fn}
                className="form-control"
                id="active-tool"
            >
                {options.map((array) => {
                    return (
                        <option value={array.value}>{array.name}</option>
                    )
                })}
            </select>
        </div>
    )
}