import { FilterEntry } from "@/utils/FILTERS"

const CollectionElementFilters = (props: {
    filters: FilterEntry[],
    active: string,
    filterCallback: (value: string) => void
}) => {
    return <div id='collection-filters'>
        {props.filters.map((entry) => {
            const isActive = entry.title === props.active;
            return <div
                key={`filter-${entry.title}`}
                className={isActive ? "collection-filters-entry collection-filters-entry-active" : "collection-filters-entry"}
                onClick={() => {
                    if (!isActive) props.filterCallback(entry.title)
                }}
            >
                <img src={isActive ? entry.images.active.src : entry.images.inactive.src} />
                <h2>{entry.title}</h2>
            </div>
        })}
    </div>
}

export default CollectionElementFilters;