const catchAsync = require("../utils/catchAsync");

// router.post("/razorpay", 
exports.payment = catchAsync( async (req, res) => {
    const { name, contact, email, course, code } = req.body;
    const payment_capture = 1;

    var amount;
    switch (course) {
        case "Python for Everyone":
            amount = 8000;
            break;
    }
    const currency = "INR"
    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    const response = await razorpay.orders.create(options)
    const users = new user({
        name,
        contact,
        email,
        course,
        order_id: response.id
    })
    const result = await users.save()

    res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
    })
})

// router.post("/verification", 
exports.verify = catchAsync(async (req, res) => {
    const secret = 'deepioticsadmin'

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    if (digest === req.headers['x-razorpay-signature']) {
        const order_id = req.body.payload.payment.entity.order_id
        const contact = req.body.payload.payment.entity.contact
        var amount = Number(req.body.payload.payment.entity.amount)
        amount /= 100;
        const payment_id = req.body.payload.payment.entity.id
        const dueUser = await user.findOne({ order_id })
        dueUser.paymentDone = true;
        await user.findByIdAndUpdate(dueUser.id, dueUser)
        const user1 = new payment({
            name: dueUser.name,
            phone: dueUser.contact,
            course: dueUser.course,
            email: dueUser.email,
            order_id,
            payment_id,
            contact,
            amount
        })
        const res = await user1.save();
        
        var totalAmount;
        switch (dueUser.course) {
            case "Python for Everyone":
                totalAmount = 8000;
                break;
        }
        data = {
            updatedAt: res.updatedAt,
            payment_id,
            totalAmount,
            amount,
            customerName: dueUser.name,
            customerEmail: dueUser.email,
            customerPhone: dueUser.contact,
            paymentStatus: dueUser.paymentDone,
            course: dueUser.course
        }
        sendEmail(dueUser.email, data)
    }
    else {

    }
    res.json({ status: 'ok' })
})