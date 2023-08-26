import { ViewType } from "@/utils/FILTERS"
import { COLLECTION } from "public/images";

const ViewTypeSelector = (props: {active: string, callback: (target: string) => void}) => {
    const setViewType = (target: string) => {
      // FIXME: re-enable after it's finished
      if (target !== props.active){
          props.callback(target);
      }
    }
    // FIXME: remove the .collected-select-viewtype-disabled
    return <div id='collected-select-viewtype' className="collected-select-viewtype">
    <div
      id='collected-select-nft'
      className={props.active === ViewType.NFT ? "collected-selector collected-selector-selected" : "collected-selector"}
      onClick={() => setViewType(ViewType.NFT)}
    >
      <img src={props.active === ViewType.NFT ? COLLECTION.viewtypes.nft.active.src : COLLECTION.viewtypes.nft.regular.src}/>
      <span>TRADABLE ITEMS</span>
    </div>
    <div
      id='collected-select-plain'
      className={props.active === ViewType.WEB2 ? "collected-selector collected-selector-selected" : "collected-selector"}
      onClick={() => setViewType(ViewType.WEB2)}
    >
      <img src={props.active === ViewType.WEB2 ? COLLECTION.viewtypes.web2.active.src : COLLECTION.viewtypes.web2.regular.src}/>
      <span>PLAIN ASSETS</span>
    </div>
    <div
      id='collected-select-all'
      className={props.active === ViewType.ALL ? "collected-selector collected-selector-selected" : "collected-selector"}
      onClick={() => setViewType(ViewType.ALL)}
    >
      <img src={props.active === ViewType.ALL ? COLLECTION.viewtypes.all.active.src : COLLECTION.viewtypes.all.regular.src}/>
      <span>ALL</span>
    </div>
</div>
}

export default ViewTypeSelector;