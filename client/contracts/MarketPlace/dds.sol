// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "../myCrypto/token.sol";
import "./Rnft.sol";

contract DDS {
    uint public itemCount; 
    credit public credits; //mainnet program: 0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565 //0xD475c58549D3a6ed2e90097BF3D631cf571Bdd86
    RealItem public realItems;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address seller;
        bool sold;
    }



    // itemId -> Item
    mapping(uint => Item) public items;
    mapping(address => mapping(uint256 => uint256)) public purchased;

    // seller => [1: itemId, 2: itemId ...]

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    event Deleted(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller
    );

    event Prooved(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller,
        string proof
    );

    constructor(credit _addrCredit, RealItem _addrRealItem) {
        credits = _addrCredit;
        realItems = _addrRealItem;
    }

    // Make item to offer on the marketplace
    function listItem(IERC721 _nft, uint _tokenId, uint _price) public {
        require(_price > 0, "Price must be greater than zero");
        require(address(_nft) == address(realItems), "Need to be a Imperial Real Item");

        address ownerofTicket = _nft.ownerOf(_tokenId);
        require(ownerofTicket == msg.sender, "Need to be the owner of the Imperial Real in order to List the item");

        // increment itemCount
        itemCount ++;

        // transfer nft
        
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            address(msg.sender),
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function deleteItem(uint _itemId) public {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(item.seller == msg.sender, "you need to be the owner of the item");
        require(!item.sold, "item already sold");

        item.sold = true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Deleted(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.seller

        );
    }

    function getPurchased(address _seller, uint256 _id) public view returns( uint256 itemId) { //see item purchased that you need to provide 
        return purchased[_seller][_id];
    }

    //make another function to confirm with a cron job API that poll an api

    function submitProof (uint256 _id, string memory _proof) public  { //https://www.canadapost-postescanada.ca/cpc/en/personal/sending/letters-mail/registered-mail.page
        //_proof is the tracking code for internationnal USPS and Post canada
        Item storage item = items[purchased[msg.sender][_id]]; //item 

        require(bytes(_proof).length == 13, "Need a Valid Tracking code"); //other requirement(poll an api to see if it exist)

        credits.transferFrom(address(this), msg.sender, item.price); //pay seller
    }

    function purchaseItem(uint _itemId, uint256 _numItem) external  {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        //require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // transfer credits to the contract and add the seller to the approval list
        purchased[address(item.seller)][_numItem + 1] = _itemId;

        credits.transferFrom(msg.sender, address(this), item.price); //approve the contract
        
        item.sold = true;
        // nft stay in contract until approved by seller ( proof of sending )
       
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

}