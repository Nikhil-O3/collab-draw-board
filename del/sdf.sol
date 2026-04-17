function transferFrom(address _from, address _to, uint256 _tokenId, uint16 _share, bytes memory _documentHash) override external payable {
    // main transfer logic

    if (!transferable[_tokenId]) {
        // revert not transferable
    }

    if (!(msg.sender == master || isOwner(_tokenId, _from))) {
        // revert not owner or master
    }

    if (shareOf(_tokenId, _from) < _share) {
        // revert insufficient share
    }

    // update shares & manage owners
}

function isOwner(uint256 _tokenId, address _address) private view returns (bool) {
    // owner lookup

    for (uint i = 0; i < allOwners.length; i++) {
        // check match
    }
}

function getIndexOfOwner(uint256 _tokenId, address _owner) private view returns (int) {
    // find index

    for (uint i = 0; i < realEstateOwners[_tokenId].length; i++) {
        // compare owner
    }
}

function removeFromRealEstateOwnersIfNoShare(uint256 _tokenId, address _from) private {
    // removal logic

    if (shareOf(_tokenId, _from) == 0) {
        // check & delete owner
    }
}

function addToRealEstateOwnersIfNewOwner(uint256 _tokenId, address _owner) private {
    // add logic

    if (!isOwner(_tokenId, _owner)) {
        // push owner
    }
}