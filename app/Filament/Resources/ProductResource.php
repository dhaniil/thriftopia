<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Produk';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Group::make()->schema([
                Forms\Components\Section::make('Informasi Produk')->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Nama Produk')
                        ->required(),

                    Forms\Components\TextInput::make('price')
                        ->label('Harga')
                        ->numeric()
                        ->prefix('Rp')
                        ->required(),

                    Forms\Components\Select::make('category_id')
                        ->label('Kategori')
                        ->relationship('category', 'name')
                        ->searchable()
                        ->required(),

                    Forms\Components\Textarea::make('description')
                        ->label('Deskripsi')
                        ->required(),

                    Forms\Components\Repeater::make('images')
                        ->relationship()
                        ->schema([
                            Forms\Components\FileUpload::make('image_path')
                                ->label('Gambar')
                                ->image()
                                ->disk('public')
                                ->directory('product-images')
                                ->required(),
                            Forms\Components\Toggle::make('is_main')
                                ->label('Gambar Utama'),
                        ])
                        ->columns(2)
                        ->defaultItems(1)
                        ->label('Gambar Produk')
                        ->required(),
                ])->columns(1),

                Forms\Components\Section::make('Varian Produk')->schema([
                    Forms\Components\Repeater::make('variants')
                        ->relationship()
                        ->schema([
                            Forms\Components\Grid::make(2)->schema([
                                Forms\Components\TextInput::make('size')
                                    ->label('Ukuran')
                                    ->required(),
                                Forms\Components\TextInput::make('color')
                                    ->label('Warna')
                                    ->required(),
                            ]),

                            Forms\Components\Grid::make(2)->schema([
                                Forms\Components\TextInput::make('stock')
                                    ->label('Stok')
                                    ->numeric()
                                    ->default(0),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Aktif')
                                    ->default(true),
                            ]),
                        ])
                        ->defaultItems(1)
                        ->columns(1)
                        ->createItemButtonLabel('Tambah Varian'),
                ])->columns(1),
            ])->columnSpan(2),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Kategori')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('images.0.image_path')
                    ->disk('public')
                    ->label('Gambar')
                    ->circular()
                    ->size(50),
                Tables\Columns\TextColumn::make('variants_count')
                    ->label('Jumlah Varian')
                    ->counts('variants'),
                Tables\Columns\TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('variants.stock')
                    ->label('Total Stok')
                    ->sum('variants', 'stock'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
