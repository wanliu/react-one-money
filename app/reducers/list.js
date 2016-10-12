import { parseData } from '../helper';
import update from 'react-addons-update';

const initialState = {
  listFetched: false,
  items: [],
  itemsWithGifts: [],
  header: '',
  footer: '',
};


export default function(state = initialState, action) {
  switch (action.type) {

  case 'CLEAN_LIST': {
    return initialState;
  }

  case 'FETCH_LIST_DONE': {
    const items = action.items.map(item => {
      item.td = action.td;
      return parseData(item);
    });

    return update(state, {
      listFetched: { $set: true},
      items: { $set: items },
    });
  }

  case 'FETCH_ONE_MONEY_DONE': {
    const { header, footer } = action;

    return update(state, {
      header: { $set: header },
      footer: { $set: footer },
    });
  }

  case 'FETCH_CALLBACK_DONE': {
    const grabs = action.item.grabs;

    if (grabs && grabs.length) {
      const pending = grabs.find(grab => grab.status == 'pending');
      const created = grabs.find(grab => grab.status == 'created');

      if (pending) {
        action.item.status = 'pending';
      } else if (created) {
        action.item.status = 'created';
      } else {
        action.item.status = grabs[0].status;
      }
    }

    if (action.item.status == 'success') delete action.item.status;

    const index = state.items.findIndex(item => item.id == action.id);
    if (index > -1) {
      return update(state, {
        items: {
          [index]: {$merge: parseData(action.item)}
        }
      });
    }
  }

  case 'UPDATE_ITEM_DONE': {
    const index = state.items.findIndex(item => item.id == action.id);
    if (action.item.item_status) {
      if (action.item.item_status != 'waiting') action.item.status = action.item.item_status;
      delete action.item.item_status;
    }
    if (index > -1) {
      return update(state, {
        items: {
          [index]: {$merge: parseData(action.item)}
        }
      });
    }
    return update(state, {
      items: {$push: [parseData(action.item)]}
    });
  }

  case 'UPDATE_SEED_COUNT': {
    const {seed_count, own_seed_count} = action.item;
    const index = state.items.findIndex(item => item.id == action.id);

    if (index > -1) {
      return update(state, {
        items: {
          [index]: {$merge: {
            seed_count,
            own_seed_count
          }}
        }
      });
    }

    return update(state, {
      items: {$push: [action.item] }
    });
  }

  case 'FETCH_GRAB_SUCCESS': {
    const index = state.items.findIndex(item => item.id == action.id);
    return update(state, {
      items: {
        [index]: {
          grabs: {$set: [action.grab]}
        }
      }
    });
  }

  case 'FETCH_ITEMS_WITH_GIFT_DONE': {
    const items = [];
    const { itemsWithGifts } = action;

    for (let i = 0; i < itemsWithGifts.length; i++) {
      const item = itemsWithGifts[i];
      const _item = state.itemsWithGifts.find(it => it.id == item.id);

      if (!_item) items.push(item);
    }

    return update(state, {
      itemsWithGifts: {$push: items }
    });
  }

  default: return state;
  }
}
