import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, quantity, price } = createProductDto;
    const product = new Product();

    product.name = name;
    product.quantity = quantity;
    product.price = price;

    await product.save();
    return product;
  }

  async addProductToOrder(id: number, quantity: number) {
    const product = await this.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException('product with this id doesnt exists');
    const newQuantity = product.quantity - quantity;
    if (newQuantity < 0)
      throw new BadRequestException(
        'dont have so much of this product at our storage',
      );
    product.quantity = newQuantity;
    product.save();
  }

  async updateProduct(
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, quantity, price } = updateProductDto;

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    await product.save();
    return product;
  }
}
