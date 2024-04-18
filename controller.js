const Art = require("./model");

const getArts = async (req, res) => {
    try {
        const arts = await Art.find();
        res.json(arts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArt = async (req, res) => {
    try {
        const art = await Art.findById(req.params.id);
        if (art == null) {
            return res.status(404).json({ message: "Art not found" });
        }
        res.json(art);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createArt = async (req, res) => {
    const art = new Art({
        artName: req.body.artName,
        serial: req.body.serial,
        src: req.body.src,
        alt: req.body.alt,
        bids: req.body.bids
    });
    try {
        const newArt = await art.save();
        res.status(201).json(newArt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateArt = async (req, res) => {
    // try {
    //     const art = await Art.findById(req.params.id);
    //     if (art == null) {
    //         return res.status(404).json({ message: "Art not found" });
    //     }
    //     if (req.body.artName != null) {
    //         art.artName = req.body.artName;
    //     }
    //     if (req.body.serial != null) {
    //         art.serial = req.body.serial;
    //     }
    //     if (req.body.src != null) {
    //         art.src = req.body.src;
    //     }
    //     if (req.body.alt != null) {
    //         art.alt = req.body.alt;
    //     }
    //     if (req.body.bids != null) {
    //         art.bids = req.body.bids;
    //     }
    //     const updatedArt = await art.save();
    //     res.json(updatedArt);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }



    // const { id } = req.params;
    // const { user, bid } = req.body;
  
    // try {
    //   let art = await Art.findById(id);
  
    //   if (!art) {
    //     return res.status(404).json({ message: 'Art not found' });
    //   }
  
     
    //   const existingBid = art.bids.find(b => b.user === user);
  
    //   if (existingBid) {
        
    //     existingBid.bid = bid;
    //   } else {
      
    //     art.bids.push({ user, bid });
    //   }
  
    
    //   art = await art.save();
  
    //   res.status(200).json({ message: 'Bid submitted successfully', art });
    // } catch (error) {
    //   console.error('Error submitting bid:', error);
    //   res.status(500).json({ message: 'Internal server error' });
    // }


//     const { user, bid } = req.body;

//   try {
//     let art = await Art.findOneAndUpdate(
//       { 'bids.user': user },
//       { $push: { bids: { user, bid } } },
//       { new: true }
//     );

//     if (!art) {
      
//       art = new Art({
//         artName: "NEW Art",
//         serial: 1,
//         src: "https://example.com/image.jpg",
//         alt: "First art image",
//         bids: [{ user, bid }]
//       });
//       await art.save();
//     }

//     res.status(200).json({ message: 'Bid submitted successfully', art });
//   } catch (error) {
//     console.error('Error submitting bid:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }



const { user, bid } = req.body;
const artId = req.params.id;

try {
  
    const art = await Art.findById(artId);

   
    if (art) {
        art.bids.push({ user, bid });
        await art.save();
        res.status(200).json(art);
    } else {
        res.status(404).json({ message: "Art not found" });
    }
} catch (error) {
    console.error('Error submitting bid:', error);
    res.status(500).json({ error: "Internal server error" });
}
};

const deleteArt = async (req, res) => {
    try {
        const {id} = req.params
        const art = await Art.findById(id);
        if (art == null) {
            return res.status(404).json({ message: "Art not found" });
        }
        await art.deleteOne({_id: id});
        res.json({ message: "Art deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getArts, getArt, createArt, updateArt, deleteArt };
